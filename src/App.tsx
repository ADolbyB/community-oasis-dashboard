// Auth
import {UserAuthContextProvider} from "./contexts/UserAuthContext";

// React
import React from "react";

// Routing
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// CSS
import "./App.css";

// Pages
import Login from "./pages/Login/Login";
import MyAccount from "./pages/MyAccount/MyAccount";
import Settings from "./pages/Settings/Settings";
import Signup from "./pages/Signup/Signup";
import Payment from "./pages/Payment/Payment";
import ReportIssue from "./pages/ReportIssue/ReportIssue";
import Surveys from "./pages/Surveys/Surveys";
import Survey from "./pages/Surveys/Survey";
import CreateSurvey from "./pages/Surveys/CreateSurvey";

/**
 * Starts the web application
 * @returns Web Application Mount Point
 */
function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-account" element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/surveys" element={
            <ProtectedRoute>
              <Surveys />
            </ProtectedRoute>
          } />
          <Route path="/surveys/create-survey" element={
            <ProtectedRoute>
              <CreateSurvey />
            </ProtectedRoute>
          } />
          <Route path="/surveys/:slug" element={
            <ProtectedRoute>
              <Survey />
            </ProtectedRoute>
          } />
          <Route path="/report-issue" element={
            <ProtectedRoute>
              <ReportIssue />
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
