import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../AuthContext/auth.provider";

const Main: React.FC = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { setThisPage } = authContext;

  useEffect(() => {
    setThisPage(location.pathname);
  }, [location.pathname, setThisPage]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Main;
