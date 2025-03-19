import React, { createContext, useState, useEffect } from "react";

type ExcelContextProps = {
  spreadsheetData: Map<string, string>;
  updateCell: (row: number, col: number, value: string) => void;
};

const ROWS = 10000;
const COLS = 10000;

const ExcelContext = createContext<ExcelContextProps | undefined>(undefined);

const ExcelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spreadsheetData, setSpreadsheetData] = useState<Map<string, string>>(new Map());
  const [formulas, setFormulas] = useState<Map<string, string>>(new Map());

  const getCellKey = (row: number, col: number) => `${row},${col}`;

  const getCellReferences = (formula: string): string[] => {
    return formula.match(/[A-Z]+[0-9]+/g) || [];
  };

  const evaluateFormula = (formula: string): string => {
    if (!formula.startsWith("=")) return formula;

    try {
      let formattedFormula = formula.slice(1);
      const cellRefs = getCellReferences(formattedFormula);

      cellRefs.forEach((cellRef) => {
        const [col, row] = [cellRef.charCodeAt(0) - 65, parseInt(cellRef.slice(1), 10) - 1];
        const cellValue = spreadsheetData.get(getCellKey(row, col)) || "0";
        formattedFormula = formattedFormula.replace(cellRef, cellValue);
      });

      return new Function(`return (${formattedFormula})`)().toString();
    } catch {
      return "ERROR";
    }
  };

  const updateCell = (row: number, col: number, value: string) => {
    setSpreadsheetData((prev) => {
      const newData = new Map(prev);

      if (value.startsWith("=")) {
        setFormulas((prevFormulas) => new Map(prevFormulas.set(getCellKey(row, col), value)));
        newData.set(getCellKey(row, col), evaluateFormula(value));
      } else {
        setFormulas((prevFormulas) => {
          const newFormulas = new Map(prevFormulas);
          newFormulas.delete(getCellKey(row, col));
          return newFormulas;
        });
        newData.set(getCellKey(row, col), value);
      }

      return newData;
    });
  };

  useEffect(() => {
    setSpreadsheetData((prev) => {
      const newData = new Map(prev);
      formulas.forEach((formula, key) => {
        const [row, col] = key.split(",").map(Number);
        const newValue = evaluateFormula(formula);

        if (newData.get(key) !== newValue) {
          newData.set(key, newValue);
        }
      });

      return newData;
    });
  }, [formulas]);

  return (
    <ExcelContext.Provider value={{ spreadsheetData, updateCell }}>
      {children}
    </ExcelContext.Provider>
  );
};

export { ExcelProvider, ExcelContext };
