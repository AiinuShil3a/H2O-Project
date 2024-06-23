import React, { useState, useEffect, ReactNode , createContext , FC } from "react";
import VerifyModal from "../components/verifyModal";
import OTPModal from "../components/verifyOTP";
import { sendOTP , ConfirmationResult } from "../Firebase/OTP";
import Swal from "sweetalert2";

type SignUpForm1Data = {
  type: "form1";
  name: string | undefined;
  lastName: string | undefined;
  email: string;
  password: string;
  phone: string | undefined;
};

type SignUpForm2Data = {
  type: "form2";
  businessName: string | undefined;
  email: string;
  password: string;
  phone: string | undefined;
};

type SignUpFormData = SignUpForm1Data | SignUpForm2Data;

interface User {
  name?: string;
  lastName?: string;
  businessName?: string;
  email: string;
  password: string;
  role: string;
  image: string;
  birthday: Date | null;
  address: string;
  phone: string | undefined;
}

interface AuthContextType {
  thisPage: string;
  setThisPage: React.Dispatch<React.SetStateAction<string>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  isOTPVarify: boolean;
  setIsOTPVarify: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin: (email: string, password: string) => Promise<void>;
 // handleForgot: (email: string) => Promise<void>;
  handleSignUp: (formData: SignUpFormData) => Promise<void>;
  whatUser: User[];
  setWhatUser: React.Dispatch<React.SetStateAction<User[]>>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [thisPage, setThisPage] = useState<string>("");
  const [whatUser, setWhatUser] = useState<User[]>([]);
  const [messageOTP, setMessageOTP] = useState<ConfirmationResult | undefined>(undefined);
  const [dataRegister, setDataRegister] = useState<User | null>(null);  
  const [reload, setReload] = useState<boolean>(false);
  const [isOTPVarify, setIsOTPVarify] = useState<boolean>(false);
  const [showModalVerify, setShowModalVerify] = useState<boolean>(false);
  const [showModalOTP, setShowModalOTP] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const handleSignUp = async (formData: SignUpFormData) => {
    try {
      const { email, password, type, phone } = formData;
      let newUser: User;

      if (type === "form1") {
        const { name, lastName } = formData;
        newUser = {
          name,
          lastName,
          email,
          password,
          phone,
          role: "user",
          image: "",
          address: "",
          birthday: null,
        };
      } else if (type === "form2") {
        const { businessName } = formData;
        newUser = {
          businessName,
          email,
          password,
          phone,
          role: "business",
          image: "",
          address: "",
          birthday: null,
        };
      } else {
        throw new Error("Invalid form type");
      }

      (document.getElementById("Get-Started") as HTMLDialogElement)?.close();

      if (!phone) {
        throw new Error("Phone number is required");
      }

      if (phone.length <= 10 && phone.length >= 9) {
        let newPhone: string = "";
        if (phone.startsWith("0")) {
          newPhone = "+66" + phone.substr(1);
          setShowModalVerify(true);
        } else if (!phone.startsWith("0")) {
          newPhone = "+66" + phone;
          setShowModalVerify(true);
        }

        const openInputOTP = () => {
          setShowModalVerify(false)
          setShowModalOTP(true)
        }

        const invalidMessageOTP = () => {
          setShowModalVerify(false)
        }

        try {
          const confirmationResult = await sendOTP(newPhone , openInputOTP , invalidMessageOTP);
          setMessageOTP(confirmationResult)
          setDataRegister(newUser)
        } catch (error) {
          console.error("Error:", (error as Error).message);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Phone Number",
          text: "Please check the phone number again.",
          confirmButtonText: "OK",
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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to sign up. Please try again.",
      });
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/userData.json");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData: User[] = await response.json();
      const user = userData.filter(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
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

  const invalidOTP =() => {
    setShowModalOTP(false)
    Swal.fire({
      icon: "error",
      title: "Invalid OTP",
      text: "Please check the otp number again.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModalOTP(true)
      }
    });
  }

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
    handleSignUp,
    //handleForgot,
    isOTPVarify,
    setIsOTPVarify,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <VerifyModal
        showModal={showModalVerify}
        onClose={() => setShowModalVerify(false)}
      />
        {children}
      <OTPModal
        showModal={showModalOTP}
        onClose={() => setShowModalOTP(false)}
        messageOTP={messageOTP}
        invalidOTP={() => invalidOTP()}
        dataRegister={dataRegister}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export type { User };

