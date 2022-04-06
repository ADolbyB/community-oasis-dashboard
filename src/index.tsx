import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import "./index.css";
import App from "./App";

const theme = createTheme({
  palette: {
    secondary: {
      main: '#3A3B3C'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
