import React, { useState, useContext ,useEffect } from "react";
import { SiGmail } from "react-icons/si";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext , User } from "../AuthContext/auth.provider";
import { FaPhone } from "react-icons/fa";
import { BsExclamationTriangle } from "react-icons/bs";
import axiosPublic from "../hook/axiosPublic";
import Swal from "sweetalert2";

interface ModalProps {
  name: string;
}

interface FormValues {
  email: string;
  password: string;
  name?: string;
  lastName?: string;
  ConfirmPassword?: string;
  phone?: string;
  businessName?: string;
}

interface UserInfo {
  name: string;
  lastName: string;
  email: string | null;
  image: string | null;
  role: string;
  isVerified: boolean;
}

const Modal: React.FC<ModalProps> = ({ name }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset 
  } = useForm<FormValues>();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { handleLogin, handleSignUp, handleForgot , userInfo , signUpWithGoogle , setUserInfo } = authContext;

  const [activePage, setActivePage] = useState<"login" | "signup-user" | "signup-business">("login");


  useEffect(() => {
    if ((activePage === "login" || activePage === "signup-user" || activePage === "signup-business") && userInfo?.role === "admin") {
      setActivePage("signup-user");
    }else{
      return
    }
  }, [userInfo , activePage]);
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.ConfirmPassword;
    const name = data.name;
    const lastName = data.lastName;
    const businessName = data.businessName;
    const phone = data.phone;
    
    if (activePage === "login") {
      handleLogin(email, password);
    } else if (activePage === "signup-user") {
      if (password === confirmPassword) {
        handleSignUp({ type: "form1", name, lastName, email, password, phone });
      } else {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password doesn't math",
        }).then((result) => {
          if (result.isConfirmed) {
            (
              document.getElementById("Get-Started") as HTMLDialogElement
            )?.showModal();
          }
        });
      }
    } else {
      if (password === confirmPassword) {
        handleSignUp({ type: "form2", businessName, email, password, phone });
      } else {
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password doesn't math",
        }).then((result) => {
          if (result.isConfirmed) {
            (
              document.getElementById("Get-Started") as HTMLDialogElement
            )?.showModal();
          }
        });
      }
    }
  };


  
  const GoogleSignUp = async (role: string) => {
    try {
      const result = await signUpWithGoogle();
  
      const user = result.user;
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
      const userGoogle = user?.email;
      if(!userGoogle){
        throw new Error("No data user...");
      }
      const userFilter = allUsers.filter(
        (user) =>
          user.email.toLowerCase() === userGoogle.toLowerCase() &&  user.role === role
      );
      const userRespone = userFilter[0]
      console.log(userRespone);
      
      if(userRespone){
        if(!userRespone.password){
          const userData = {
            email : userRespone.email,
            role : userRespone.role,
          }
          
          try {
            const response = await axiosPublic.post("/user/login", userData, { withCredentials: true });
            const data = response.data;
  
            if (data.isVerified) {
              setUserInfo(data);
              return
            } else {
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
            console.error("Error logging in user:", error);
          }
        }else if(userRespone.password){
          (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
          Swal.fire({
            icon: 'error',
            title: 'Email is already in use',
            text: "You didn't sign up through Google.",
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
            }
          });
          return
        }
      }

      const displayName = user?.displayName;
      let firstName = "";
      let lastName = "";
  
      if (displayName) {
        const parts = displayName.split(" ");
        firstName = parts[0];
        lastName = parts[1];
      }
  
      let userInfo: UserInfo[] = [];
  
      if (role === "user" || role === "admin") {
        const reqBody = {
          name: firstName,
          lastName: lastName,
          email: user?.email,
          image: user?.photoURL,
          isVerified: user?.emailVerified,
          role: role,
        };
        userInfo.push(reqBody);
      } else if (role === "business") {
        const str = user?.uid;
        const firstFourChars = str.slice(0, 4);
        const nameDefaultBusiness = `Business@${firstFourChars}`;
        
        const reqBody = {
          businessName: nameDefaultBusiness,
          name: firstName,
          lastName: lastName,
          email: user?.email,
          image: user?.photoURL,
          isVerified: user?.emailVerified,
          role: role,
        };
        userInfo.push(reqBody);
      } else [
        userInfo = []
      ]
  
      if (userInfo.length > 0) {
        const response = await axiosPublic.post(`/user/${role}Register`, ...userInfo);
  
        (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
        const dataRegister = response.data;
  
        if (dataRegister) {
          Swal.fire({
            title: "Login google account successfully",
            icon: "success",
            timer: 1500,
          });
  
          const userData = {
            email: dataRegister.email,
            role: dataRegister.role,
          };
  
          try {
            const response = await axiosPublic.post("/user/login", userData, { withCredentials: true });
            const data = response.data;
  
            if (data.isVerified) {
              setUserInfo(data);
            } else {
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
            console.error("Error logging in user:", error);
          }
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Invalid role specified.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error signing up with Google:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again later.",
        icon: "error",
      });
    }
  };
  
  const GoogleSignUpOrSignIn = () => {
    if(activePage === "signup-user"){
      const role = "user"
      GoogleSignUp(role)
    }else if(activePage === "signup-business"){
      const role = "business"
      GoogleSignUp(role)
    }else if(activePage === "login"){
      (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
      Swal.fire({
        title: 'Select status to log in',
        text: 'Log in with your Google account.',
        showCancelButton: true,
        confirmButtonText: 'USER',
        cancelButtonText: 'BUSINESS',
        reverseButtons: false,
        customClass: {
          confirmButton: 'swal-button-confirm',
          cancelButton: 'swal-button-cancel'
        }
      }).then((result) => {
        if (result.isConfirmed) {
            const role = (result.dismiss === Swal.DismissReason.cancel) ? "business" : "user";
            GoogleSignUp(role)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            const role = "business";
            GoogleSignUp(role)
        }
      });
    }   
  };

  const toggleForm = (page: "login" | "signup-user" | "signup-business") => {
    reset();
    setActivePage(page);
  };

  const handleForgotPasswordClick = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    reset();
    (document.getElementById("Get-Started") as HTMLDialogElement)?.close();
    event.preventDefault();

    const validateEmailFormat = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const { value: email } = await Swal.fire({
      title: "Enter your email",
      input: "text",
      inputPlaceholder: "Enter the email your forgot!",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter an email address";
        } else if (!validateEmailFormat(value)) {
          return "Invalid email format";
        }
      },
    });
    handleForgot(email);
  };

  if (userInfo && userInfo?.role !== "admin") {
    return null;
  }

  return (
    <dialog id={name} className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            (document.getElementById(name) as HTMLDialogElement).close();
            reset();
            toggleForm("login");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-xl ml-auto mr-auto">
            {activePage === "login"
              ? "Login Now"
              : activePage === "signup-user" && userInfo?.role !== "admin"
              ? "Sign Up - Customer"
              :activePage === "signup-business"
              ? "Sign Up - Business"
              : activePage === "signup-user" && userInfo?.role === "admin"
              ? "Sign Up - Admin"
              : null
            }
          </h3>
          {activePage === "login" ? (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>              
                  {errors.email && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.email.message}</span>
                        </span>
                      </div>
                  )}
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format"
                    }
                  })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  {errors.password && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.password.message}</span>
                        </span>
                      </div>
                  )}
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "Please enter a password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                      message:
                        "The password format is incorrect.",
                    },
                  })}
                />
              </div>
            </>
          ) : activePage === "signup-user" ? (
            <>
              <div className="flex flex-row justify-between">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                    {errors.name && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.name.message}</span>
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered w-full"
                    {...register("name", {
                      required: "Please enter",
                      pattern: {
                        value: /^[A-Za-zก-ฮ]+$/,
                        message: "Invalid format"
                      }
                    })}
                  />
                </div>
                <div className="ml-2">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                    {errors.lastName && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.lastName.message}</span>
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="input input-bordered w-full"
                    {...register("lastName", {
                      required: "Please enter",
                      pattern: {
                        value: /^[A-Za-zก-ฮ]+$/,
                        message: "Invalid format"
                      }
                    })}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                  {errors.email && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.email.message}</span>
                        </span>
                      </div>
                  )}
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format"
                    }
                  })}
                />
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                    {errors.password && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.password.message}</span>
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    {...register("password", {
                      required: "Please enter a password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                        message: "Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and be at least 8 characters long.",
                      },
                    })}
                  />
                </div>
                <div className="ml-2">
                  <label className="label">
                    <span className="label-text whitespace-nowrap">Confirm Password</span>
                      {errors.ConfirmPassword && (
                        <div className="tooltip">
                          <span className="text-alert text-sm">
                            <BsExclamationTriangle className="inline-block mr-1" />
                            <span className="tooltip-text">{errors.ConfirmPassword.message}</span>
                          </span>
                        </div>
                      )}
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered w-full"
                    {...register("ConfirmPassword", {
                      required: "Please enter a password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                        message: "Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and be at least 8 characters long.",
                      },
                    })}
                  />
                </div>
              </div>
              <label className="label flex items-center">
                <span className="label-text flex items-center">
                  Phone Number <FaPhone className="ml-1" />
                </span>
                {errors.phone && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.phone.message}</span>
                        </span>
                      </div>
                )}
              </label>
              <div className="flex flex-row justify-between">
                <div>
                  <select className="input input-bordered w-[4.4rem]">
                    <option value="+66">
                      +66 {String.fromCharCode(160)} ( Thailand )
                    </option>
                  </select>
                </div>

                <input
                  type="tel"
                  placeholder="Phone number"
                  className="input input-bordered ml-2 w-full"
                  {...register("phone", {
                    required: "Please enter a password",
                    minLength: {
                      value: 9,
                      message: "Password must be at least 9 number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone must be at max 10 number",
                    },
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please enter a only phone number",
                    },
                  })}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Business name</span>
                  {errors.businessName && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.businessName.message}</span>
                        </span>
                      </div>
                  )}
                </label>
                <input
                  type="text"
                  placeholder="Your business name"
                  className="input input-bordered"
                  {...register("businessName", {
                    required: "Please enter",
                  })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                  {errors.email && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.email.message}</span>
                        </span>
                      </div>
                  )}
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email format"
                    }
                  })}
                />
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                    {errors.password && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.password.message}</span>
                        </span>
                      </div>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    {...register("password", {
                      required: "Please enter a password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                        message: "Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and be at least 8 characters long.",
                      },
                    })}
                  />
                </div>
                <div className="ml-2">
                  <label className="label">
                    <span className="label-text whitespace-nowrap">
                      Confirm Password
                    </span>
                    {errors.ConfirmPassword && (
                        <div className="tooltip">
                          <span className="text-alert text-sm">
                            <BsExclamationTriangle className="inline-block mr-1" />
                            <span className="tooltip-text">{errors.ConfirmPassword.message}</span>
                          </span>
                        </div>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered w-full"
                    {...register("ConfirmPassword", {
                      required: "Please enter a password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                        message: "Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and be at least 8 characters long.",
                      },
                    })}
                  />
                </div>
              </div>
              <label className="label flex items-center">
                <span className="label-text flex items-center">
                  Phone Number <FaPhone className="ml-1" />
                </span>
                {errors.phone && (
                      <div className="tooltip">
                        <span className="text-alert text-sm">
                          <BsExclamationTriangle className="inline-block mr-1" />
                          <span className="tooltip-text">{errors.phone.message}</span>
                        </span>
                      </div>
                )}
              </label>
              <div className="flex flex-row justify-between">
                <div>
                  <select className="input input-bordered w-[4.4rem]">
                    <option value="+66">
                      +66 {String.fromCharCode(160)} ( Thailand )
                    </option>
                  </select>
                </div>

                <input
                  type="tel"
                  placeholder="Phone number"
                  className="input input-bordered ml-2 w-full"
                  {...register("phone", {
                    required: "Please enter a password",
                    minLength: {
                      value: 9,
                      message: "Password must be at least 9 number",
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone must be at max 10 number",
                    },
                    pattern: {
                      value: /^[0-9\b]+$/,
                      message: "Please enter a only phone number",
                    },
                  })}
                />
              </div>
            </>
          )}
          <div className="form-control">
            {activePage === "login" && (
              <label className="label ml-auto mt-5">
                <a
                  href="#"
                  className="label-text-alt link link-hover"
                  onClick={handleForgotPasswordClick}
                >
                  Forgot password?
                </a>
              </label>
            )}
          </div>
          <div className="form-control mt-2">
            <input
              type="submit"
              value={activePage === "login" ? "Login" : "Sign Up"}
              className={
                activePage === "login"
                  ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white border-white"
                  : activePage === "signup-user" && userInfo?.role !== "admin"
                  ? "btn bg-gradient-to-r from-primaryUser to-secondUser transition-opacity group-hover:opacity-100 text-white border-white"
                  : activePage === "signup-business"
                  ? "btn bg-gradient-to-r from-primaryBusiness to-secondBusiness transition-opacity group-hover:opacity-100 text-white border-white"
                  : activePage === "signup-user" && userInfo?.role === "admin"
                  ? "btn bg-gradient-to-r from-primaryAdmin to-secondAdmin transition-opacity group-hover:opacity-100 text-white border-white"
                  : "btn bg-gradient-to-r from-dark to-smoke transition-opacity group-hover:opacity-100 text-white border-white"
              }
            />
          </div>
          <p className="text-center my-2 font-bold text-[0.9rem] ">
            {activePage === "login"
              ? "Don't have an account?"
              : (activePage === "signup-user" || activePage === "signup-business") && userInfo?.role !== "admin"
              ? "Already have an account?"
              : "For administrators only"}{" "}
            <button
              type="button"
              className="underline text-red-700 ml-1"
              onClick={() =>
                toggleForm(activePage === "login" ? "signup-user" : "login")
              }
            >
              {activePage === "login" 
                ? "Sign Up Now" 
                : (activePage === "signup-user" || activePage === "signup-business") && userInfo?.role !== "admin"
                ? "Login"
                : null
              }
            </button>
          </p>
        </form>
        {
          activePage === "signup-user" && userInfo?.role === "admin"
          ? null
          :(
            <div className="max-w-screen-xl flex items-center justify-between">
              <hr
                className={
                  activePage === "login" || activePage === "signup-user" && userInfo?.role !== "admin"
                    ? "w-[50vw] border-t-2 border-primaryUser shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                    : userInfo?.role === "admin"
                    ? "w-[50vw] border-t-2 border-primaryAdmin shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                    : "w-[50vw] border-t-2 border-primaryBusiness shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                }
              />
              <div className="items-center justify-center ml-6 mr-6 font-bold">
                <h3>or</h3>
              </div>
              <hr
                className={
                  activePage === "login" || activePage === "signup-business" && userInfo?.role !== "admin"
                    ? "w-[50vw] border-t-2 border-primaryBusiness shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                    : userInfo?.role === "admin"
                    ? "w-[50vw] border-t-2 border-primaryAdmin shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                    : "w-[50vw] border-t-2 border-primaryUser shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                }
              />
            </div>
          )
        }
        <div className="text-center justify-center items-center p-7">
        {
          activePage === "signup-user" && userInfo?.role === "admin"  
            ? null
            : (
                <button
                  className={
                    activePage === "login"
                      ? "rounded-[0.5rem] w-full h-10 relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                      : activePage === "signup-user" && userInfo?.role !== "admin"
                      ? "rounded-[0.5rem] w-full h-10 relative overflow-hidden focus:outline-none bg-white border border-primaryUser text-primaryUser hover:bg-primaryUser hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                      : activePage === "signup-business"
                      ? "rounded-[0.5rem] w-full h-10 relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryBusiness hover:bg-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                      : activePage === "signup-user" && userInfo?.role === "admin"
                      ? "rounded-[0.5rem] w-full h-10 relative overflow-hidden focus:outline-none bg-white border border-primaryAdmin text-primaryAdmin hover:bg-primaryAdmin hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                      : "rounded-[0.5rem] w-full h-10 relative overflow-hidden focus:outline-none bg-white border border-dark text-dark hover:bg-dark hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                  }  
                  onClick={GoogleSignUpOrSignIn}
                >
                  <span className="relative z-10 flex items-center justify-center w-full h-full">
                    <SiGmail className="w-6 h-6" />
                    <h3 className="ml-3">Gmail</h3>
                  </span>
                </button>
              )
        }
          
          {(activePage === "signup-user" || activePage === "signup-business") && userInfo?.role !== "admin"  ? (
            <button
              className={
                activePage === "signup-user"
                  ? "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryUser text-primaryUser hover:bg-primaryUser hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-4"
                  : "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryBusiness hover:bg-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-4"
              }
              onClick={() =>
                toggleForm(
                  activePage === "signup-user"
                    ? "signup-business"
                    : "signup-user"
                )
              }
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <h3 className="ml-3">
                  {activePage === "signup-user"
                    ? "Sign Up for Business"
                    : "Sign Up for Customer"}
                </h3>
              </span>
            </button>
          ) : null}
        </div>
        <div
          className={
            activePage === "login"
              ? "bg-gradient-to-r from-primaryUser to-primaryBusiness absolute left-0 right-0 h-6"
              : activePage === "signup-user" && userInfo?.role !== "admin"
              ? "bg-primaryUser absolute left-0 right-0 h-6"
              : activePage === "signup-business"
              ? "bg-primaryBusiness absolute left-0 right-0 h-6"
              : activePage === "signup-user"&& userInfo?.role === "admin"
              ? "bg-primaryAdmin absolute left-0 right-0 h-6"
              : "bg-dark absolute left-0 right-0 h-6"
          }
        />
      </div>
    </dialog>
  );
};

export default Modal;
