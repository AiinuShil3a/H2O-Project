import React, { useState, useEffect , useContext } from "react";
import { SiGmail } from "react-icons/si";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthContext/auth.provider";

const Modal = ({ name }) => {

  const { handleSubmit, formState: { errors }, register, watch } = useForm();

  const { handleLogin } = useContext(AuthContext);

  const [activePage, setActivePage] = useState("login");
  const [countriesData, setCountriesData] = useState([]);

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;
    if (activePage === "login") {
      handleLogin(email, password);
    } else if (activePage === "signup-user") {
      console.log("Hello2");
    } else {
      console.log("Hello3");
    }
  };

  const toggleForm = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/codePhone.json");
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <dialog id={name} className="modal">
      <div className="modal-box ">
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
          {activePage === "login" ? (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email")}
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
                  {...register("password")}
                />
              </div>
            </>
          ) : activePage === "signup-user" ? (
            <>
              <div className="flex flex-row justify-between">
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered w-full"
                    required
                    {...register("name")}
                  />
                </div>
                <div className="ml-2">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your last name"
                    className="input input-bordered w-full"
                    required
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email")}
                />
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                    {...register("password")}
                  />
                </div>
                <div className="ml-2">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered w-full"
                    required
                    {...register("c-password")}
                  />
                </div>
              </div>
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <div className="flex flex-row justify-between">
                <div>
                  <select className="input input-bordered w-[4.4rem]">
                    {countriesData.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.code} {String.fromCharCode(160)}({" "}
                        {country.name} )
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="input input-bordered ml-2 w-full"
                  required
                  {...register("phone")}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Business name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your business name"
                  className="input input-bordered"
                  required
                  {...register("b-name")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email")}
                />
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    required
                    {...register("password")}
                  />
                </div>
                <div className="ml-2">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered w-full"
                    required
                    {...register("c-password")}
                  />
                </div>
              </div>
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <div className="flex flex-row justify-between">
                <div>
                  <select className="input input-bordered w-[4.4rem]">
                    {countriesData.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.code} {String.fromCharCode(160)}({" "}
                        {country.name} )
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="input input-bordered ml-2 w-full"
                  required
                  {...register("phone")}
                />
              </div>
            </>
          )}
          <div className="form-control">
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
                  ? "btn bg-gradient-to-r from-primaryUser to-secondUser transition-opacity group-hover:opacity-100 text-white"
                  : "btn bg-gradient-to-r from-primaryBusiness to-secondBusiness transition-opacity group-hover:opacity-100 text-white"
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
        <div className="max-w-screen-xl flex items-center justify-between">
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
        <div className="text-center justify-center items-center p-7">
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
                    ? "Sing Up for Business"
                    : "Sing Up for Customer"}
                </h3>
              </span>
            </button>
          ) : null}
        </div>
        <div
          className={
            activePage === "login"
              ? "bg-gradient-to-r from-primaryUser to-primaryBusiness absolute bottom-0 left-0 right-0 h-3"
              : activePage === "signup-user"
              ? "bg-primaryUser absolute bottom-0 left-0 right-0 h-3"
              : "bg-primaryBusiness absolute bottom-0 left-0 right-0 h-3"
          }
        ></div>
      </div>
    </dialog>
  );
};

export default Modal;
