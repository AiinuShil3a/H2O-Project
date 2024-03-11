import React , {useContext} from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { AuthContext } from "../AuthContext/auth.provider";

const Navbar = () => {
  const { thisPage } = useContext(AuthContext);
  return (
    thisPage === "/" ?(
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div
        className="relative p-8 h-[700px]"
        style={{
          backgroundImage: 'url("https://i.imgur.com/cMKQjfM.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://i.imgur.com/yF7nGI7.png"
              className="h-8"
              alt="H2O"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              H2O
            </span>
          </Link>
          <div className="hidden md:flex flex-grow items-center justify-center">
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
          <div className="flex items-center">
            <button className="ml-4 px-4 py-2 rounded">
              Get Started
            </button>
          </div>
        </div>

        <div className="flex items-center mt-[80px]">
          <Search />
        </div>
      </div>
    </nav>
    ):(
      thisPage === "/signUp-User"?(
        <h1>h1</h1>
      ):(
        null
      )
    )
  );
};

export default Navbar;
