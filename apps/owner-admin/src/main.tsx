import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { LayoutProvider } from './context/layoutContext';
import ContextProvider from './context/ThemeSetting';
import CTBThemeProvider from './context/ctbThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <CTBThemeProvider>
          <LayoutProvider>
            <CssBaseline />
            <App />
          </LayoutProvider>
        </CTBThemeProvider>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
