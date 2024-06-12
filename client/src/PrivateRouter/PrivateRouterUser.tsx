import { AuthContext } from "../AuthContext/auth.provider";
import { useContext, ReactNode, FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

interface AuthProviderProps {
  children: ReactNode;
}

const PrivateRouterUser: FC<AuthProviderProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { userInfo, handleLogout } = authContext;

  useEffect(() => {
    if (!userInfo) {
      Swal.fire({
        title: "Please log in",
        text: "You must log in first!",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        (
          document.getElementById("Get-Started") as HTMLDialogElement
        )?.showModal();
      });
    } else if (userInfo.role !== "user") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your role is not user!",
        footer: '<a href="#" id="logout-link">Logout now!</a>',
        willOpen: () => {
          const logoutLink = document.getElementById("logout-link");
          if (logoutLink) {
            logoutLink.addEventListener("click", handleLogout);
          }
        },
      });
    }
  }, []);

  if (userInfo && userInfo.role === "user") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRouterUser;
