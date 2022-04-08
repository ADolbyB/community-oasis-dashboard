import React, {createContext, useContext, useEffect, useState} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  connectAuthEmulator,
} from "firebase/auth";

import app from "../firebase";


// Init auth object
const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  const authy = connectAuthEmulator(auth, "http://localhost:9099");
}

interface IAuthContext {
  user: any,
  logIn: any,
  signUp: any,
  logOut: any,
  updateDisplayName: any
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
  function updateDisplayName(firstName: string, lastName: string) {
    if (auth.currentUser !== null) {
      return updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
    }
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
      value={{user, logIn, signUp, logOut, updateDisplayName}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
