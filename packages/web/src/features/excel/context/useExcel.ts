import { useContext } from 'react';
import { ExcelContext } from './ExcelProvider';

const useExcel = () => {
  const context = useContext(ExcelContext);
  if (!context) {
    throw new Error('useExcel must be used within a ExcelProvider');
  }
  return context;
};

export { useExcel };
