/* eslint-disable no-unused-vars */
import firebase from "firebase/app";
import "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDeYpFB2gHEVeIPe-lREviQCQbgLFB3g1g",
  authDomain: "fir-auth-72fca.firebaseapp.com",
  projectId: "fir-auth-72fca",
  storageBucket: "fir-auth-72fca.appspot.com",
  messagingSenderId: "824629658746",
  appId: "1:824629658746:web:667bb25c38bef6f05d67c3",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// create an auth context
const authContext = createContext();

// create the provider

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// hook for child component to get the auth object
// ... and update when it changes.

export const useAuth = () => {
  return useContext(authContext);
};

const provider = new firebase.auth.GoogleAuthProvider();

function useProvideAuth() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photoUrl: ''
  });
  const [error, setError] = useState('');

  // signinwithpopup
  const signInWithPopUp = async () => {
    try {
      const response = await firebase.auth()
        .signInWithPopup(provider);
        const {displayName, photoUrl, email} = response.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoUrl: photoUrl
        };
        setUser(signedInUser);
        return user;
        
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      
      setError(errorCode, errorMessage);
    }
  };
  // signout
  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  // get user on mount

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // return the user object and auth methods
  return {
    user,
    signInWithPopUp,
    signout,
  };
}
