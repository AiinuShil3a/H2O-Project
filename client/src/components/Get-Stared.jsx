import React, { useState } from "react";
import { SiGmail } from "react-icons/si";
import { useForm } from "react-hook-form";

const Modal = ({ name }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [activePage, setActivePage] = useState("login");

  const onSubmit = (data) => {
    console.log(data);
  };

  const toggleForm = (page) => {
    setActivePage(page);
  };

  return (
    <dialog id={name} className="modal">
      <div className="modal-box ">
        <div
          className={
            activePage === "login"
              ? "bg-gradient-to-r from-primaryUser to-primaryBusiness absolute bottom-0 left-0 right-0 h-3"
              : activePage === "signup-user"
              ? "bg-primaryUser absolute bottom-0 left-0 right-0 h-3"
              : "bg-primaryBusiness absolute bottom-0 left-0 right-0 h-3"
          }
        ></div>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            toggleForm("login");
            document.getElementById(name).close();
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
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-xl ml-auto mr-auto">
            {activePage === "login"
              ? "Login Now"
              : activePage === "signup-user"
              ? "Sign Up - Customer"
              : "Sign Up - Business"}
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            {activePage === "login" && (
              <label className="label ml-auto mt-5">
                <a href="#" className="label-text-alt link link-hover">
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
                  ? "btn bg-gradient-to-r from-primaryUser to-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
                  : activePage === "signup-user"
                  ? "btn bg-primaryUser transition-opacity group-hover:opacity-100 text-white"
                  : "btn bg-primaryBusiness transition-opacity group-hover:opacity-100 text-white"
              }
            />
          </div>
          <p className="text-center my-2 ">
            {activePage === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              className="underline text-red-700 ml-1 "
              onClick={() =>
                toggleForm(
                  activePage === "login"
                    ? "signup-user"
                    : activePage === "signup-user" ||
                      activePage === "signup-business"
                    ? "login"
                    : activePage === "login"
                )
              }
            >
              {activePage === "login" ? "Sign Up Now" : "Login"}
            </button>
          </p>
        </form>
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <hr
            className={
              activePage === "login" || activePage === "signup-user"
                ? "w-[50vw] border-t-2 border-primaryUser shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                : "w-[50vw] border-t-2 border-primaryBusiness shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
            }
          />
          <div className="items-center justify-center ml-6 mr-6">
            <h3>or</h3>
          </div>
          <hr
            className={
              activePage === "login" || activePage === "signup-business"
                ? "w-[50vw] border-t-2 border-primaryBusiness shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
                : "w-[50vw] border-t-2 border-primaryUser shadow-lg flex items-center space-x-3 rtl:space-x-reverse"
            }
          />
        </div>
        <div className="text-center card-body">
          <button
            className={
              activePage === "login"
                ? "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryUser hover:bg-gradient-to-r from-primaryUser to-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                : activePage === "signup-user"
                ? "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryUser text-primaryUser hover:bg-primaryUser hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
                : "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryBusiness hover:bg-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2"
            }
          >
            <span className="relative z-10 flex items-center justify-center w-full h-full">
              <SiGmail className="w-6 h-6" />
              <h3 className="ml-3">Gmail</h3>
            </span>
          </button>
          {activePage === "signup-user" || activePage === "signup-business" ? (
            <button
              className={
                activePage === "signup-user"
                  ? "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryUser text-primaryUser hover:bg-primaryUser hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-2"
                  : "rounded-[0.5rem] w-full h-12 relative overflow-hidden focus:outline-none bg-white border border-primaryBusiness text-primaryBusiness hover:bg-primaryBusiness hover:text-white hover:border-white hover:shadow-lg transition-transform transform-gpu hover:-translate-y-2 mt-2"
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
                    ? "Sing Up for Business"
                    : "Sing Up for Customer"}
                </h3>
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
