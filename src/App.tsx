//React
import React from "react";
import { Route, Routes } from 'react-router-dom';

//CSS
import "./App.css";

//Pages
import Login from "./pages/Login"
/**
 * Starts the web application
 * @return {JSX.Element} Web Application Mount Point
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />      
      </Routes>
    </div>
  );
}

export default App;
