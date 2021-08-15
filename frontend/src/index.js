import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './style/index.css';
import App from './App';
import { reducer } from './reducer/index';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { DialogProvider } from './providers/DialogProvider';
import theme from './theme';
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <DialogProvider>
            <CssBaseline />
            <App />
          </DialogProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);