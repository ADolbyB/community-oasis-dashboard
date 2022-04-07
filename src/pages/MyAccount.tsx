//Auth
import { useUserAuth } from "../contexts/UserAuthContext";

// React
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A web page view for account management
 * @returns Web Page View
 */
export default function MyAccount() {
  const [error, setError] = useState("");
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(`Unexpected Error: ${error}`);
      }
    }
  }
  return (
    <div>
      {error}
      <p>Im in</p>
      <button onClick={handleLogout}>Signout</button>
    </div>
  );
}
