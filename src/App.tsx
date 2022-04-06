import React from "react";
import logo from "/src/logo.svg";
import "./App.css";
// import app from "./firebase";

/**
 * Starts the web application
 * @return {JSX.Element} Web Application Mount Point
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Check me out <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          The app works now, lmao.
        </p>
      </header>
    </div>
  );
}

export default App;
