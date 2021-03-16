import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { LayoutProvider } from './context/layoutContext';
import ContextProvider from './context/ThemeSetting';
import CTBThemeProvider from './context/ctbThemeProvider';
import { AuthContextProvider } from '@ctb/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
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
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
