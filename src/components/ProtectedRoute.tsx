import React from "react";
import {Navigate} from "react-router-dom";
import {useUserAuth} from "../contexts/UserAuthContext";

type Prop = {
  children: JSX.Element
}

/**
 * Protects the route from unauth users.
 * @param {Prop} children - Used to insert route that is going to be protected.
 * @returns Protected route.
 */
const ProtectedRoute = ({children}: Prop) => {
  const {user} = useUserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
