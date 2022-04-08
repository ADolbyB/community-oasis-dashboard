import React, {createContext, useContext, useEffect, useState} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";

import app from "../firebase";

// Init auth object
const auth = getAuth(app);
interface IAuthContext {
  user: any,
  userFirstName: string,
  userLastName: string,
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
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

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
    if(auth.currentUser !== null) {
      return updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`
      }).then(() => {
        console.log('Name updated')
        const name = user.displayName.split(" ")
        setUserFirstName(name[0])
        setUserLastName(name[1])
      })
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
      value={{user, userFirstName, userLastName, logIn, signUp, logOut, updateDisplayName}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => {
  return useContext(userAuthContext);
};
