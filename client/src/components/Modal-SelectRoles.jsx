import React, { useContext } from "react";
import { FaHouseUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { AuthContext } from "../AuthContext/auth.provider";

const ModalSelectRoles = ({ name }) => {
  const { whatUser, setUserInfo } = useContext(AuthContext);
  const clickUser = () => {
    const customerUser = whatUser.find((user) => user.role === "user");
    setUserInfo(customerUser);
    document.getElementById(name).close();
  };
  const clickBusiness = () => {
    const businessUser = whatUser.find((user) => user.role === "business");
    setUserInfo(businessUser);
    document.getElementById(name).close();
  };
  return (
    <dialog id={name} className="modal">
      <div className="modal-box ">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            document.getElementById(name).close();
            document.getElementById("Get-Started").showModal();
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
        <button
          className="rounded-[0.5rem] w-full h-[100px] relative overflow-hidden focus:outline-none bg-white border border-primaryUser text-primaryUser hover:bg-primaryUser hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 text-[30px]"
          onClick={clickUser}
        >
          <span className="relative z-10 flex items-center justify-center w-full h-full">
            <FaHouseUser />
            <h3 className="ml-3">Customer</h3>
          </span>
        </button>
        <button
          className="rounded-[0.5rem] w-full h-[100px] relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryBusiness hover:bg-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-[1rem] text-[36px]"
          onClick={clickBusiness}
        >
          <span className="relative z-10 flex items-center justify-center w-full h-full">
            <FaBuildingUser />
            <h3 className="ml-3">Business</h3>
          </span>
        </button>
      </div>
    </dialog>
  );
};

export default ModalSelectRoles;
