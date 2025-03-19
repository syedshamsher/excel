import { Routes as BaseRoutes, Route } from 'react-router-dom';
import { ExcelPage, Dashboard, ExcelProvider } from './features';

const Routes = () => {
  return (
    <BaseRoutes>
      <Route index element={<Dashboard />} />
      <Route
        path="new-workbook"
        element={
          <ExcelProvider>
            <ExcelPage />
          </ExcelProvider>
        }
      />
    </BaseRoutes>
  );
};

export { Routes };
