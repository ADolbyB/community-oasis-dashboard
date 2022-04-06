// REACT
import React from "react";
import {Route, Routes} from "react-router-dom";

// CSS
import "./App.css";

// Pages
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
/**
 * Starts the web application
 * @return {JSX.Element} Web Application Mount Point
 */
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/my-account" element={<MyAccount />}/>
      </Routes>
    </div>
  );
}

export default App;
