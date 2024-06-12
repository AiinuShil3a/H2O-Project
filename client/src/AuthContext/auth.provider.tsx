import React, { useState, useEffect, ReactNode } from "react";
import { createContext, FC } from "react";
import Swal from "sweetalert2";

interface User {
  name?: string;
  lastName?: string;
  businessName?: string;
  email: string;
  password: string;
  role: string;
  image: string;
}

interface AuthContextType {
  thisPage: string;
  setThisPage: React.Dispatch<React.SetStateAction<string>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin: (email: string, password: string) => Promise<void>;
  whatUser: User[];
  setWhatUser: React.Dispatch<React.SetStateAction<User[]>>;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [thisPage, setThisPage] = useState<string>("");
  const [whatUser, setWhatUser] = useState<User[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(() => {
  const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/userData.json");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData: User[] = await response.json();
      const user = userData.filter(
        (user) => user.email === email && user.password === password
      );
      if (user.length > 1) {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        (
          document.getElementById("Modal-SelectRoles") as HTMLDialogElement
        )?.showModal();
        setWhatUser(user);
      } else if (user.length === 1) {
        setUserInfo(user[0]);
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
      } else {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
          footer: '<a href="#">Why do I have this issue?</a>',
        }).then((result) => {
          if (result.isConfirmed) {
            (
              document.getElementById("Get-Started") as HTMLDialogElement
            )?.showModal();
          }
        });
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const authInfo: AuthContextType = {
    thisPage,
    setThisPage,
    reload,
    setReload,
    userInfo,
    setUserInfo,
    handleLogin,
    whatUser,
    setWhatUser,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
