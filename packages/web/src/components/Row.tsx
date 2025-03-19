import React from 'react';
import {CellComponent} from './Cell';

type RowProps = {
  'data-row-key': string;
};

const RowComponent: React.FC<RowProps> = ({ 'data-row-key': rowIndex }) => {
  const rowNumber = parseInt(rowIndex, 10);

  return (
    <tr>
      {Array.from({ length: 26 }).map((_, colIndex) => (
        <td key={colIndex}>
          <CellComponent rowIndex={rowNumber} colIndex={colIndex} />
        </td>
      ))}
    </tr>
  );
};

export { RowComponent };
