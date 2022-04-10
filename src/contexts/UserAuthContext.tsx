import React, {createContext, useContext, useEffect, useState} from "react";

// Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  connectAuthEmulator,
} from "firebase/auth";

// Firestore
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";

import app from "../firebase";


// Init auth object
const auth = getAuth(app);

// Init Firestore object
const db = getFirestore(app);


if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
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
/**
 * Context used so pages can access auth.
 * @param {Prop} children - The routes under the context.
 * @returns Functions used in authContextProvider.
 */
export function UserAuthContextProvider({children}: Prop) {
  const [user, setUser] = useState<any>({});

  /**
   * Used to log users into application with firebase
   * @param {string }email - Email used by user to log in
   * @param {string} password - Password used by user to log in
   * @returns signInWithEmailAndPassword
   */
  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Used to create users with firebase.
   * @param {string} email - Email used to create users.
   * @param {string} password - Password used to create users.
   * @returns createUserWithEmailAndPassword
   */
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Used to deauthenticate users
   * @returns signOut
   */
  function logOut() {
    return signOut(auth);
  }

  /**
   * Used to enter display name into database.
   * @param {string} firstName - Firstname.
   * @param {string} lastName - LastName.
   * @returns updateProfile
   */
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
