import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContext/auth.provider";

const Main = () => {
  //หน้าที่ในการเข้าถึงข้อมูลเกี่ยวกับ URL ปัจจุบัน
  const location = useLocation();
  const { setThisPage } = useContext(AuthContext);

  useEffect(() => {
    setThisPage(location.pathname); // แสดง path ปัจจุบัน และเซทไว้มน Context
  }, [location.pathname, setThisPage]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
