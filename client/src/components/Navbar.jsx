import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { AuthContext } from "../AuthContext/auth.provider";
import Modal from "./Get-Stared";
import ModalSelectRoles from "./Modal-SelectRoles";

const Navbar = () => {
  const { thisPage, userInfo, handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <nav
        className={
          thisPage === "/"
            ? "bg-white border-gray-200 dark:bg-gray-900 relative"
            : userInfo && userInfo.role === "user"
            ? "bg-gradient-to-r from-primaryUser to-secondUser border-gray-200 dark:bg-gray-900 relative"
            : userInfo && userInfo.role === "business"
            ? "bg-gradient-to-r from-primaryBusiness to-secondBusiness border-gray-200 dark:bg-gray-900 relative"
            : "bg-gradient-to-r from-primaryBusiness to-secondBusiness border-gray-200 dark:bg-gray-900 relative"
        }
      >
        <div
          className={
            !userInfo || (userInfo && thisPage === "/")
              ? "relative p-8 h-[700px]"
              : "relative"
          }
          style={
            !userInfo || (userInfo && thisPage === "/")
              ? {
                  backgroundImage: 'url("https://i.imgur.com/cMKQjfM.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {}
          }
        >
          <div className="flex items-center justify-between">
            <Modal name="Get-Started" />
            <ModalSelectRoles name="Modal-SelectRoles" />
            {/* โลโก้ */}
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse text-xl"
            >
              <img
                src="https://i.imgur.com/yF7nGI7.png"
                className="h-10"
                alt="H2O"
              />
              <span className="self-center font-bold whitespace-nowrap dark:text-black">
                H2O
              </span>
            </Link>

            {/* รายการเมนู */}
            <div className="hidden md:flex flex-grow items-center justify-center text-lg">
              <ul className="font-medium flex space-x-8 rtl:space-x-reverse">
                <li>
                  <Link to="/home" className="link-style ml-[50px]">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="link-style ml-[50px]">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/service" className="link-style ml-[50px]">
                    Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="link-style ml-[50px]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get Started ปุ่ม */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-lg font-bold py-2 px-4 rounded"
              onClick={
                !userInfo
                  ? () => document.getElementById("Get-Started").showModal()
                  : toggleDropdown
              }
            >
              {!userInfo ? (
                <>Get Started</>
              ) : (
                <>
                  <div className="relative">
                    <img
                      id="avatarButton"
                      type="button"
                      data-dropdown-toggle="userDropdown"
                      data-dropdown-placement="bottom-start"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      src={userInfo.image}
                      alt="User dropdown"
                    />
                    {isOpen && (
                      <div
                        id="userDropdown"
                        className="z-10 absolute right-7 mt-2 bg-white divide-y divide-gray-100 rounded-[1.25rem] rounded-tr-[0rem] shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          <div>
                            {userInfo.role === "user"
                              ? `${userInfo.name} ${userInfo.lastName}`
                              : userInfo.role === "business"
                              ? `${userInfo.businessName}`
                              : null}
                          </div>
                          <div className="font-medium truncate">
                            {userInfo.email}
                          </div>
                        </div>
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="avatarButton"
                        >
                          <li>
                            <a
                              href={`profile-${userInfo.role}`}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Dashboard
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Earnings
                            </a>
                          </li>
                        </ul>
                        <div className="py-1">
                          <a
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </button>
          </div>
          {!userInfo || (userInfo && thisPage === "/") ? (
            <div className="flex items-center mt-[100px]">
              <Search />
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
