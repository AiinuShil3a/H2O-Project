import React, { useState, useEffect, ReactNode } from "react";
import VerifyModal from "../components/verifyModal";
import OTPModal from "../components/verifyOTP";
import { createContext, FC } from "react";
import { sendOTP } from "../Firebase/OTP";
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
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleForgot: (email: string) => Promise<void>;
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
  const [reload, setReload] = useState<boolean>(false);
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
        const confirmationResult = await sendOTP(newPhone , openInputOTP);

        if (!confirmationResult) {
          throw new Error("No confirmationResult");
        }
        let inputOTP: string = "";

        while (inputOTP === "") {
          const { value } = await Swal.fire({
            title: "Enter your OTP",
            input: "text",
            inputLabel: "OTP",
            inputPlaceholder: "Enter the OTP sent to your phone",
            showCancelButton: true,
          });
          if (value === undefined || value === "") {
            inputOTP = "";
          }
          inputOTP = value;
          try {
            await confirmationResult.confirm(inputOTP);
            break;
          } catch (error) {
            await Swal.fire({
              icon: "error",
              title: "Invalid OTP",
              text: "The OTP you entered is incorrect. Please try again.",
            });
            inputOTP = "";
          }
        }
        setUserInfo(newUser);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Sign up successful!",
        });
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

  const handleForgot = async (email: string) => {
    try {
      const response = await fetch("/userData.json");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData: User[] = await response.json();
      const user = userData.filter(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );
      if (user.length > 1) {
        const { isConfirmed, isDenied, isDismissed } = await Swal.fire({
          title: "Select Role",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "User",
          denyButtonText: "Business",
          cancelButtonText: "All User",
          customClass: {
            confirmButton: "user-button",
            denyButton: "business-button",
          },
        });

        if (isConfirmed) {
          const role = "user";
          console.log(role);
        } else if (isDenied) {
          const role = "business";
          console.log(role);
        } else if (isDismissed) {
          const role1 = "user";
          const role2 = "business";
          console.log(role1);
          console.log(role2);
        }
      } else if (user.length === 1) {
        let phone: string | null = null;
        while (user[0].phone !== phone) {
          const { value } = await Swal.fire({
            title: "Enter your phone",
            input: "text",
            inputLabel: "PHONE NUMBER",
            inputPlaceholder: "Enter the phone sent to your OTP",
            showCancelButton: true,
          });
          if (value === null) return;
          phone = value;
          if (user[0].phone !== phone) {
            await Swal.fire({
              icon: "error",
              title: "Invalid phone",
              text: "The phone you entered is incorrect. Please try again.",
            });
          }
        }

        const otp = await sendOTP(phone);

        let inputOTP: string = "";
        while (inputOTP !== "") {
          const { value } = await Swal.fire({
            title: "Enter your OTP",
            input: "text",
            inputLabel: "OTP",
            inputPlaceholder: "Enter the OTP sent to your phone",
            showCancelButton: true,
          });
          if (value === null) return;
          inputOTP = value;
          if (inputOTP !== otp) {
            await Swal.fire({
              icon: "error",
              title: "Invalid OTP",
              text: "The OTP you entered is incorrect. Please try again.",
            });
          }
        }

        let newPassword = "";
        let confirmPassword = "";
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        const passwordValid = true;
        while (passwordValid) {
          const { value: newPass } = await Swal.fire({
            title: "Enter New Password",
            input: "password",
            inputPlaceholder: "Enter your new password",
            inputAttributes: {
              minlength: "8",
              required: "true",
            },
            showCancelButton: true,
          });

          if (!newPass) {
            return;
          }

          if (!passwordRegex.test(newPass)) {
            await Swal.fire({
              icon: "error",
              title: "Invalid Password",
              text: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.",
            });
            continue;
          }

          const { value: confirmPass } = await Swal.fire({
            title: "Confirm New Password",
            input: "password",
            inputPlaceholder: "Re-enter your new password",
            inputAttributes: {
              minlength: "8",
              required: "true",
            },
            showCancelButton: true,
          });

          if (!confirmPass) {
            return;
          }

          if (newPass === confirmPass) {
            newPassword = newPass;
            confirmPassword = confirmPass;
            break;
          } else {
            await Swal.fire({
              icon: "error",
              title: "Passwords do not match",
              text: "The passwords you entered do not match. Please try again.",
            });
          }
        }
        //ยิง api ที่นี่
        if (newPassword === confirmPassword) {
          console.log("New password:", newPassword);
        }
      } else {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email!",
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
    handleSignUp,
    handleForgot,
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
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
