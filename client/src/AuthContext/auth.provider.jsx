/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useContext, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [thisPage, setThisPage] = useState("");
  const [reload, setReload] = useState(false);
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const authInfo = {
    thisPage,
    setThisPage,
    reload,
    setReload,
    userInfo,
    setUserInfo
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
