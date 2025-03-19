import React, { useState, useEffect, useContext } from "react";
import { ExcelContext } from "../features";
import styles from "./index.module.scss";

type CellProps = {
  rowIndex: number;
  colIndex: number;
  style: React.CSSProperties;
};

const CellComponent: React.FC<CellProps> = ({ rowIndex, colIndex, style }) => {
  const excelContext = useContext(ExcelContext);
  if (!excelContext) return null;

  const { spreadsheetData, updateCell } = excelContext;
  const cellKey = `${rowIndex},${colIndex}`;

  const [value, setValue] = useState(spreadsheetData.get(cellKey) || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(spreadsheetData.get(cellKey) || "");
  }, [spreadsheetData, cellKey]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    updateCell(rowIndex, colIndex, value);
    setIsEditing(false);
  };

  return (
    <div
      className={styles.cell}
      style={style}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          className={styles.cellInput}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span className={styles.cellText}>{value}</span>
      )}
    </div>
  );
};

export { CellComponent };
