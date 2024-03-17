import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/auth.provider";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { userInfo , handleLogout } = useContext(AuthContext);
  
  if (userInfo && userInfo.role === "user") {
    return (
      <div>
        <h1>ยินดีต้อนรับ{userInfo.email}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Profile;
