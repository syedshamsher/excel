import { ConfigProvider } from 'antd';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { antTheme } from './utils';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={antTheme}>
        <Routes />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export { App };
