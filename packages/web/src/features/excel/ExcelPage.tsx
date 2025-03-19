import React, { useContext } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { ExcelContext } from "./context";
import { CellComponent } from "../../components/Cell";
import styles from "./index.module.scss";

const ExcelPage: React.FC = () => {
  const excelContext = useContext(ExcelContext);
  if (!excelContext) return <div>Loading...</div>;

  const columnCount = 10000;
  const rowCount = 10000;
  const columnWidth = 100;
  const rowHeight = 30;
  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.8;

  const CellRenderer = ({ columnIndex, rowIndex, style }: any) => (
    <CellComponent rowIndex={rowIndex} colIndex={columnIndex} style={style} />
  );

  return (
    <div className={styles.excelContainer}>
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={columnWidth}
        rowHeight={rowHeight}
        width={width}
        height={height}
        itemData={{}}
      >
        {CellRenderer}
      </Grid>
    </div>
  );
};

export { ExcelPage };
