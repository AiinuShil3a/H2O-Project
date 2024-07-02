import React, {useState,useEffect,ReactNode,createContext,FC,} from "react";
import VerifyModal from "../components/verifyModal";
import OTPModal from "../components/verifyOTP";
import { sendOTP, ConfirmationResult } from "../Firebase/OTP";
import Swal from "sweetalert2";
import axiosPublic from "../hook/axiosPublic";
import bcrypt from 'bcryptjs';
import {
  auth,
  GoogleAuthProvider , 
  signInWithPopup,
  UserCredential
} from "../Firebase/firebase.config";

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

type SignInWithPopupFunction = () => Promise<UserCredential>;

interface User {
  _id?: string;
  name?: string;
  lastName?: string;
  businessName?: string;
  email: string;
  password: string;
  phone: string | undefined;
  image: string;
  role: string;
}

interface UserRegister {
  name?: string;
  lastName?: string;
  businessName?: string;
  email: string;
  password: string;
  phone: string | undefined;
  role: string;
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
  handleForgot: (email: string) => Promise<void>;
  handleSignUp: (formData: SignUpFormData) => Promise<void>;
  whatUser: User[];
  setWhatUser: React.Dispatch<React.SetStateAction<User[]>>;
  signUpWithGoogle: SignInWithPopupFunction;
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
  const [dataRegister, setDataRegister] = useState<UserRegister | null>(null);
  const [changPassword, setChangPassword] = useState<User | null>(null);
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
      let newUser: UserRegister;

      if (type === "form1") {
        const { name, lastName } = formData;
        let yourRole:string = ""
        let roles:string = "";

        if(userInfo){
          yourRole = userInfo?.role;
        }

        const createdAdmin = yourRole;

        if(createdAdmin === "admin"){
          roles = "admin";
        }else{
          roles = "user";
        }

        newUser = {
          name,
          lastName,
          email,
          password,
          phone,
          role: roles,
        };
      } else if (type === "form2") {
        const { businessName } = formData;
        newUser = {
          businessName,
          email,
          password,
          phone,
          role: "business",
        };
      } else {
        throw new Error("Invalid form type");
      }

      (document.getElementById("Get-Started") as HTMLDialogElement)?.close();

      let haveEmail:boolean = true;
      const cheackMail = await axiosPublic.post(`/user/checkEmailExists` , {email:newUser.email , role:newUser.role})
      haveEmail = cheackMail.data
      
      if(haveEmail){
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        Swal.fire({
          icon: "error",
          title: "this email can't use!",
          text: `Can't register because this email is use role ${newUser.role}.`,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
          }
        });
      }else if(!haveEmail){
        if (!phone) {
          throw new Error("Phone number is required");
        }
  
        if (phone.length <= 10 && phone.length >= 9) {
          let newPhone: string = "";
          if (phone.startsWith("0")) {
            if(phone.length <= 9){
              (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
              Swal.fire({
                icon: "error",
                title: "Please check the phone numbe",
                text: "The Phone number format is incorrect.",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
                }
              });
            }else{
              newPhone = "+66" + phone.substr(1);
              newUser.phone = newPhone;
              setShowModalVerify(true);
            }
          } else if (!phone.startsWith("0")) {
            if(phone.length >= 10){
              (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
              Swal.fire({
                icon: "error",
                title: "Please check the phone numbe",
                text: "The Phone number format is incorrect.",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
                }
              });
            }else{
              newPhone = "+66" + phone;
              newUser.phone = newPhone;
              setShowModalVerify(true);
            }
          }
  
          const openInputOTP = () => {
            setShowModalVerify(false);
            setShowModalOTP(true);
          };
  
          const invalidMessageOTP = () => {
            setShowModalVerify(false);
          };
  
          try {
            if(userInfo?.role !== "admin" && newUser.role === "admin"){
              Swal.fire({
                icon: "error",
                title: "Can't register because role isn't admin",
                text: "Please check the role if you want register admin.",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
                }
              });
            }else{
              const confirmationResult = await sendOTP(
                newPhone,
                openInputOTP,
                invalidMessageOTP
              );
              setMessageOTP(confirmationResult);
              setDataRegister(newUser);
            }
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
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      Swal.fire({
        icon: "error",
        title: "Error invalid phone",
        text: "Failed to sign up. Please try enter phone number again.",
        confirmButtonText: "OK",
        }).then((result) => {
        if (result.isConfirmed) {
          (
            document.getElementById("Get-Started") as HTMLDialogElement
          )?.showModal();
        }
      });
    }
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const responseUser = await axiosPublic.get("/user/userData");
      const responseBusiness = await axiosPublic.get("/user/businessData");
      const responseAdmin = await axiosPublic.get("/user/adminData");
          
      if (!responseUser && !responseBusiness && !responseAdmin) {
        throw new Error("Failed to fetch user data");
      }

      const userDataUser: User[] = await responseUser.data;
      const userDataBusiness: User[] = await responseBusiness.data;
      const userDataAdmin: User[] = await responseAdmin.data;

      const allUsers = [...userDataUser, ...userDataBusiness, ...userDataAdmin];
      
      const user = allUsers.filter(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() 
      );

      
      if (user.length >= 2) {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        (document.getElementById("Modal-SelectRoles") as HTMLDialogElement)?.showModal();
        const userSendData = [...user, { password : password }] as User[];
        setWhatUser(userSendData);
      } else if (user.length === 1) { 
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        const loggedInUser = user[0];
        const userData = {
          "email": email,
          "password": password,
          "role": loggedInUser.role
        }
        if(isPasswordValid){
          try {
            const response = await axiosPublic.post("/user/login", userData, { withCredentials: true });
            const data = response.data;   
              if(data.isVerified){
                setUserInfo(data);
              }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'Email Confirmation',
                  text: 'Your email has not been confirmed yet.',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
                  }
                });
              }
            (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
          } catch (error) {
            console.error("Error registering user:", error);
          }
        }else{
          (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Password!",
            footer: '<a href="#">Why do I have this issue?</a>',
          }).then((result) => {
            if (result.isConfirmed) {
              (
                document.getElementById("Get-Started") as HTMLDialogElement
              )?.showModal();
            }
          });
        }   
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
      const responseUser = await axiosPublic.get("/user/userData");
      const responseBusiness = await axiosPublic.get("/user/businessData");
      const responseAdmin = await axiosPublic.get("/user/adminData");
          
      if (!responseUser && !responseBusiness && !responseAdmin) {
        throw new Error("Failed to fetch user data");
      }

      const userDataUser: User[] = await responseUser.data;
      const userDataBusiness: User[] = await responseBusiness.data;
      const userDataAdmin: User[] = await responseAdmin.data;

      const allUsers = [...userDataUser, ...userDataBusiness, ...userDataAdmin];
      
      const user = allUsers.filter(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase()  && user.password
      );

      if(user.length > 0){
        const validatePhoneFormat = (phone : string) => {
          const phoneRegex = /^\d{10}$/;
          return phoneRegex.test(phone);
        };    

        const { value: phone } = await Swal.fire({
          title: "Enter your phone number",
          input: "text",
          inputPlaceholder: "Please enter 10 digits only.",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "You need to enter an phone";
            }else if (!validatePhoneFormat(value)) {
              return 'Invalid phone number format';
            }
          },
        });

        let newPhone: string = "";
        if (phone.startsWith("0")) {
          newPhone = "+66" + phone.substr(1);
        } else {
          newPhone = "";
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

        const whatUsers = user.filter(u => u.phone === newPhone);
  
        if(whatUsers.length > 0){
          let readyChangePassword : User[] = []

          const inputOptions: { [key: string]: string } = {};
          whatUsers.forEach((user) => {
            inputOptions[user.role] = user.role.charAt(0).toUpperCase() + user.role.slice(1);
          });

          if(whatUsers.length >= 2){
            const { value: role } = await Swal.fire({
              title: 'Select your role',
              input: 'select',
              inputOptions: inputOptions,
              inputPlaceholder: 'Select a role',
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return 'You need to select a role';
                }
              }
            });
            const oneUser = whatUsers.find((user) => user.role === role);
            if (oneUser) {
              readyChangePassword.push(oneUser)
            }
          }else if (whatUsers.length === 1){
            readyChangePassword = [whatUsers[0]]
          }
          
          const phonInData = readyChangePassword[0].phone

          if(phonInData){
            setChangPassword(readyChangePassword[0])
            setShowModalVerify(true);
            
            const openInputOTP = () => {
              setShowModalVerify(false);
              setShowModalOTP(true);
            };
    
            const invalidMessageOTP = () => {
              setShowModalVerify(false);
            };
    
            try {
              const confirmationResult = await sendOTP(
                phonInData,
                openInputOTP,
                invalidMessageOTP
              );
              setMessageOTP(confirmationResult);
              setDataRegister(null);
            } catch (error) {
              console.error("Error:", (error as Error).message);
            }
          }else{
            Swal.fire({
              icon: 'error',
              title: "Error something",
              text: 'Please contact the admin.',
            });  
          }        
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Email and Phone not math',
            text: 'The email and phone you entered does not math in our system.',
          });  
        }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Email not found',
          text: 'The email you entered does not exist in our system.',
        });   
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  const invalidOTP = () => {
    setShowModalOTP(false);
    Swal.fire({
      icon: "error",
      title: "Invalid OTP",
      text: "Please check the otp number again.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModalOTP(true);
      }
    });
  };

  const handleLogout = async() => {
    await axiosPublic.post("/user/logout");
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
    isOTPVarify,
    setIsOTPVarify,
    signUpWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <VerifyModal
        showModal={showModalVerify}
      />
      {children}
      <OTPModal
        showModal={showModalOTP}
        onClose={() => setShowModalOTP(false)}
        messageOTP={messageOTP}
        setMessageOTPUndify={() => setMessageOTP(undefined)}
        invalidOTP={() => invalidOTP()}
        dataRegister={dataRegister}
        changPassword={changPassword}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export type { UserRegister , User };
