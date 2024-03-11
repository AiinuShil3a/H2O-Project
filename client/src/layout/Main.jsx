import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContext/auth.provider";

const Main = () => {
  //หน้าที่ในการเข้าถึงข้อมูลเกี่ยวกับ URL ปัจจุบัน
  const location = useLocation();
  const { setThisPage } = useContext(AuthContext);

  useEffect(() => {
    setThisPage(location.pathname); // แสดง path ปัจจุบัน และเซทไว้ใน Context
  }, [location.pathname, setThisPage]); //ทำทุกครั้งเมื่อ ค่ามีการเปลี่ยนแปลง

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
