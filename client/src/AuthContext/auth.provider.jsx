import React, { useState, useEffect } from "react";
import { useContext, createContext } from "react";
import Swal from 'sweetalert2'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [thisPage, setThisPage] = useState("");
  const [whatUser, setWhatUser] = useState([]);
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

  const handleLogin = async(email, password ,) => {
    try {
      const response = await fetch("/userData.json");
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      // ตรวจสอบว่า email และ password ตรงกับข้อมูลที่มีในระบบหรือไม่
      const user = userData.filter(user => user.email === email && user.password === password);
      if (user.length > 1) {
        document.getElementById("Get-Started").close();
        document.getElementById("Modal-SelectRoles").showModal();
        setWhatUser(user)
      } else if(user.length === 1){
        setUserInfo(user[0]);
        document.getElementById("Get-Started").close();
      }
      else {
        document.getElementById("Get-Started").close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
          footer: '<a href="#">Why do I have this issue?</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById("Get-Started").showModal();
          }
        });
        
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };  

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("user");
  };

  const authInfo = {
    thisPage,
    setThisPage,
    reload,
    setReload,
    userInfo,
    setUserInfo,
    handleLogin,
    whatUser, 
    setWhatUser,
    handleLogout
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
