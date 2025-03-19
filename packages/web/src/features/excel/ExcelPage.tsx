import { Table } from 'antd';
import React, { useContext } from 'react';
import { ExcelContext } from './context';
import { RowComponent } from '../../components';
import styles from './index.module.scss';

const ExcelPage: React.FC = () => {
  const excelContext = useContext(ExcelContext);

  if (!excelContext) {
    return <div>Loading...</div>;
  }

  const { spreadsheetData } = excelContext;

  const columns = Array.from({ length: spreadsheetData[0].length }, (_, colIndex) => ({
    title: String.fromCharCode(65 + colIndex),
    dataIndex: `col${colIndex}`,
    key: `col${colIndex}`,
  }));

  const dataSource = spreadsheetData.map((_, rowIndex) => ({
    key: rowIndex.toString(),
  }));

  return (
    <div className={styles.excelContainer}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        scroll={{ x: 'max-content', y: '70vh' }}
        components={{
          body: {
            row: RowComponent,
          },
        }}
      />
    </div>
  );
};

export { ExcelPage };
