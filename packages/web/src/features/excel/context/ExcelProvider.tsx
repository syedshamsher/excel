import React, { createContext, useState, useEffect } from "react";

type ExcelContextProps = {
  spreadsheetData: string[][];
  updateCell: (row: number, col: number, value: string) => void;
};

const ROWS = 10;
const COLS = 10;

const ExcelContext = createContext<ExcelContextProps | undefined>(undefined);

const ExcelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [spreadsheetData, setSpreadsheetData] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );

  // Store formulas separately
  const [formulas, setFormulas] = useState<Map<string, string>>(new Map());

  // Get all cell references (A1, B2, etc.)
  const getCellReferences = (formula: string): string[] => {
    return formula.match(/[A-Z]+[0-9]+/g) || [];
  };

  // Evaluate a formula dynamically
  const evaluateFormula = (formula: string): string => {
    if (!formula.startsWith("=")) return formula;

    try {
      let formattedFormula = formula.slice(1);
      const cellRefs = getCellReferences(formattedFormula);

      cellRefs.forEach((cellRef) => {
        const [col, row] = [cellRef.charCodeAt(0) - 65, parseInt(cellRef.slice(1), 10) - 1];
        const cellValue = spreadsheetData[row]?.[col] || "0";
        formattedFormula = formattedFormula.replace(cellRef, cellValue);
      });

      return new Function(`return (${formattedFormula})`)().toString();
    } catch {
      return "ERROR";
    }
  };

  // Update cell value and check for formulas
  const updateCell = (row: number, col: number, value: string) => {
    setSpreadsheetData((prev) => {
      const newData = [...prev.map((row) => [...row])];

      if (value.startsWith("=")) {
        setFormulas((prevFormulas) => new Map(prevFormulas.set(`${row},${col}`, value)));
        newData[row][col] = evaluateFormula(value);
      } else {
        setFormulas((prevFormulas) => {
          const newFormulas = new Map(prevFormulas);
          newFormulas.delete(`${row},${col}`);
          return newFormulas;
        });
        newData[row][col] = value;
      }

      return newData;
    });
  };

  // ✅ FIX: Only recalculate affected formulas (Prevents Infinite Loops)
  useEffect(() => {
    setSpreadsheetData((prev) => {
      let newData = [...prev.map((row) => [...row])];

      // Only update cells that have formulas
      let hasChanges = false;
      formulas.forEach((formula, key) => {
        const [row, col] = key.split(",").map(Number);
        const newValue = evaluateFormula(formula);

        if (newData[row][col] !== newValue) {
          newData[row][col] = newValue;
          hasChanges = true;
        }
      });

      return hasChanges ? newData : prev; // Only update if changes occurred
    });
  }, [formulas]); // ✅ Only re-run when formulas change

  return (
    <ExcelContext.Provider value={{ spreadsheetData, updateCell }}>
      {children}
    </ExcelContext.Provider>
  );
};

export { ExcelProvider, ExcelContext };
