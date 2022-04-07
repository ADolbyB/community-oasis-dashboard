import React, {createContext, useContext, useEffect, useState} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import app from "../firebase";

// Init auth object
const auth = getAuth(app);
interface IAuthContext {
  logIn: any,
  user: any,
  signUp: any,
  logOut: any
}

type Prop = {
  children: JSX.Element
}

const userAuthContext = createContext<Partial<IAuthContext>>({});

export function UserAuthContextProvider({children}: Prop) {
  const [user, setUser] = useState<any>({});

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <userAuthContext.Provider
      value={{user, logIn, signUp, logOut}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
