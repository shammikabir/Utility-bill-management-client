import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { app } from "../Firebase/Firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const createuser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //login

  const signIn = (email, password) => {
    // setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google signin

  const signInWithEmailFunc = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //password reset

  const sendPassResetEmailFunc = (email) => {
    setloading(true);
    return sendPasswordResetEmail(auth, email);
  };
  const authData = {
    createuser,
    user,
    loading,
    signInWithEmailFunc,
    setloading,
    setUser,
    signIn,
    sendPassResetEmailFunc,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
