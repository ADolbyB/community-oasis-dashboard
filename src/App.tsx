// Auth
import {UserAuthContextProvider} from "./contexts/UserAuthContext";

// REACT
import React from "react";

// Routing
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// CSS
import "./App.css";

// Pages
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Settings from './pages/Settings';
import Signup from './pages/Signup'

/**
 * Starts the web application
 * @returns Web Application Mount Point
 */
function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/my-account" element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
