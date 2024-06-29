import { useContext } from "react";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdAdminPanelSettings } from 'react-icons/md';
import { AuthContext } from "../AuthContext/auth.provider";
import Swal from "sweetalert2";
import bcrypt from 'bcryptjs';
import axiosPublic from "../hook/axiosPublic";

interface loginData {
  email: string; 
  password: string; 
  role: string;
}

const ModalSelectRoles = ({ name } : {name : string}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { whatUser, setUserInfo , userInfo } = authContext;
  const customerUser = whatUser.find((user) => user.role === "user");
  const businessUser = whatUser.find((user) => user.role === "business");
  const adminUser = whatUser.find((user) => user.role === "admin");

  let password:string = "";
  if(whatUser.length === 4){
    password = whatUser[3].password;
  }else if(whatUser.length === 3){
    password = whatUser[2].password;
  }

  const apiLogin = async(userData: loginData) => {
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
      (document.getElementById(name) as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  const clickUser = async() => {
    if(!customerUser){
      throw new Error('No customerUser!');
    }
    const isPasswordValid = await bcrypt.compare(password, customerUser.password);
    const userData = {
      "email": customerUser.email,
      "password": password,
      "role": customerUser.role
    }
    if(isPasswordValid){
      apiLogin(userData)
    }else{
      (document.getElementById(name) as HTMLDialogElement)?.close();
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
  };
  const clickBusiness = async() => {
    if(!businessUser){
      throw new Error('No customerUser!');
    }
    const isPasswordValid = await bcrypt.compare(password, businessUser.password);
    const userData = {
      "email": businessUser.email,
      "password": password,
      "role": businessUser.role
    }
    if(isPasswordValid){
      apiLogin(userData)
    }else{
      (document.getElementById(name) as HTMLDialogElement)?.close();
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
  };
  const clickAdmin = async() => {
    if(!adminUser){
      throw new Error('No adminUser!');
    }
    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    const userData = {
      "email": adminUser.email,
      "password": password,
      "role": adminUser.role
    }
    if(isPasswordValid){
      apiLogin(userData)
    }else{
      (document.getElementById(name) as HTMLDialogElement)?.close();
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
  };

  if(userInfo){
    return
  }
  
  return (
    <dialog id={name} className="modal">
      <div className="modal-box ">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            (document.getElementById(name) as HTMLDialogElement)?.close();
            (document.getElementById("Get-Started") as HTMLDialogElement)?.showModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div className="card-body">
          <h1 className="font-bold text-xl ml-auto mr-auto">
            What do you want to log in as?
          </h1>
        </div>
        {customerUser ? (
          <>
            <button
              className="rounded-[0.5rem] w-full h-[100px] relative overflow-hidden focus:outline-none bg-white border border-primaryUser text-primaryUser hover:bg-gradient-to-r from-primaryUser to-secondUser hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 text-[30px]"
              onClick={clickUser}
            >
              <span className="relative z-10 flex items-center justify-start w-full h-full">
                <div className="flex flex-row items-center justify-start w-full h-full">
                  <FaHouseUser className="ml-10" />
                  <h3 className="flex-1 text-center">Customer</h3>
                </div>
              </span>
            </button>
          </>
        ) : null }
        {businessUser ? (
          <>
            <button
            className="rounded-[0.5rem] w-full h-[100px] relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryBusiness hover:bg-gradient-to-r from-primaryBusiness to-secondBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-[1rem] text-[36px]"
            onClick={clickBusiness}
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="flex flex-row items-center justify-start w-full h-full">
                  <FaBuildingUser className="ml-10" />
                  <h3 className="flex-1 text-center">Business</h3>
                </div>
              </span>
            </button>
          </>
        ) : null }
        {adminUser ?(
          <>
            <button
            className="rounded-[0.5rem] w-full h-[100px] relative overflow-hidden focus:outline-none bg-white border border-primaryAdmin text-primaryAdmin hover:bg-gradient-to-r from-primaryAdmin to-secondAdmin hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-[1rem] text-[36px]"
            onClick={clickAdmin}
            >
              <span className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="flex flex-row items-center justify-start w-full h-full">
                  <MdAdminPanelSettings className="ml-10" />
                  <h3 className="flex-1 text-center">Admin</h3>
                </div>
              </span>
            </button>
          </>
        ) : null}
      </div>
    </dialog>
  );
};

export default ModalSelectRoles;