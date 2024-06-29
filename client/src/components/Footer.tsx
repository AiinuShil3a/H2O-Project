import { AuthContext } from "../AuthContext/auth.provider";
import { useContext } from "react";
const Footer = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { userInfo, thisPage } = authContext;
  return (
    <footer
      className={
        userInfo?.role === "user" && thisPage !== "/"
          ? "bg-gradient-to-l from-primaryUser to-secondUser text-white py-4"
          : userInfo?.role === "business" && thisPage !== "/"
          ? "bg-gradient-to-l from-primaryBusiness to-secondBusiness text-white py-4"
          : userInfo?.role === "admin" && thisPage !== "/"
          ? "bg-gradient-to-l from-primaryAdmin to-secondAdmin text-white py-4"
          : "bg-gradient-to-r from-primaryUser to-primaryBusiness text-white py-4 mt-10"
      }
    >
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-center">
          © 2024 Travel Website. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
