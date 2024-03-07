import { useContext } from "react";
import Profile from "./Profile";
import Model from "./Modal";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const navItem = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Category</summary>
          <ul className="p-2">
            <li>
              <a href="/shop">All</a>
            </li>
            <li>
              <a>Clothing</a>
            </li>
            <li>
              <a>Accessories</a>
            </li>
            <li>
              <a>Gadgets</a>
            </li>
            <li>
              <a>Swag</a>
            </li>
          </ul>
        </details>
      </li>

      <li tabIndex={0}>
        <details>
          <summary>Service</summary>
          <ul className="p-2">
            <li>
              <a>Order Online</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Promotion</a>
      </li>
    </>
  );
  return (
    <header className="max-w-screen-2x1 container mx-auto fixed top-0 left-0 right-0 translate-all duration-300 ease-in-out">
      <div className="navbar xl:px-24">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItem}
              </ul>
            </div>
            <a className="btn btn-ghost text-xl">
              <img src="/logo.png" alt="" className="h-12 pr-1 mx-auto" />
              <span className="text-red">Test </span> SE Souvenir Shop
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle lg:flex mr-3 items-center justify-center hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle hidden sm:flex"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            {user ? (
              <>
                <Profile user={user} />
              </>
            ) : (
              <button
                className="btn bg-red rounded-full text-white flex items-center gap-2 "
                onClick={() => document.getElementById("login").showModal()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
                Login
              </button>
            )}
          </div>
          <Model name="login" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;