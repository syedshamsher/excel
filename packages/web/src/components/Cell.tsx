import React, { useState, useEffect } from "react";
import { useExcel } from "../features";

type CellProps = {
  rowIndex: number;
  colIndex: number;
};

const CellComponent: React.FC<CellProps> = ({ rowIndex, colIndex }) => {
  const { spreadsheetData, updateCell } = useExcel();
  const [value, setValue] = useState(spreadsheetData[rowIndex][colIndex]);
  const [isEditing, setIsEditing] = useState(false);

  // Prevent unnecessary state updates to avoid infinite loop
  useEffect(() => {
    if (value !== spreadsheetData[rowIndex][colIndex]) {
      setValue(spreadsheetData[rowIndex][colIndex]);
    }
  }, [spreadsheetData, rowIndex, colIndex]); // Dependency array ensures it updates only when necessary

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    updateCell(rowIndex, colIndex, value);
    setIsEditing(false);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  return (
    <input
      type="text"
      value={isEditing ? value : spreadsheetData[rowIndex][colIndex]}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export { CellComponent };
