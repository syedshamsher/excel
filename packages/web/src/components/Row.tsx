import React from "react";
import { CellComponent } from "./Cell";

type RowProps = {
  rowIndex: number;
  columnCount: number;
  style: React.CSSProperties;
};

const RowComponent: React.FC<RowProps> = ({ rowIndex, columnCount, style }) => {
  return (
    <div style={style} className="row">
      {Array.from({ length: columnCount }).map((_, colIndex) => (
        <CellComponent key={colIndex} rowIndex={rowIndex} colIndex={colIndex} style={{ width: 100, height: 30 }} />
      ))}
    </div>
  );
};

export { RowComponent };
