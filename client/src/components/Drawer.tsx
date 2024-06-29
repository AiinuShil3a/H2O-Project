import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/auth.provider";
import { useContext } from "react";
import { BsCamera } from "react-icons/bs";

const Drawer: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { userInfo, handleLogout } = authContext;

  return (
    <div>
      <div className="md:w-1/4">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className={
                userInfo?.role === "user"
                  ? "btn btn-circle btn-primary drawer-button lg:hidden bg-gradient-to-b from-primaryUser to-secondUser"
                  : userInfo?.role === "business"
                  ? "btn btn-circle btn-primary drawer-button lg:hidden bg-gradient-to-b from-primaryBusiness to-secondBusiness"
                  : userInfo?.role === "admin"
                  ? "btn btn-circle btn-primary drawer-button lg:hidden bg-gradient-to-b from-primaryAdmin to-secondAdmin"
                  : "btn btn-circle btn-primary drawer-button lg:hidden bg-gradient-to-b from-dark to-smoke"
              }
            >
              <RxHamburgerMenu />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <ul
              className={
                userInfo?.role === "user"
                  ? "menu p-4 w-80 min-h-full bg-gradient-to-b from-primaryUser to-secondUser text-dark text-xl"
                  : userInfo?.role === "business"
                  ? "menu p-4 w-80 min-h-full bg-gradient-to-b from-primaryBusiness to-secondBusiness text-dark text-xl"
                  : userInfo?.role === "admin"
                  ? "menu p-4 w-80 min-h-full bg-gradient-to-b from-primaryAdmin to-secondAdmin text-dark text-xl"
                  : "menu p-4 w-80 min-h-full bg-gradient-to-b from-dark to-smoke text-white text-xl"
              }
            >
              <div className="flex items-center justify-center mt-5">
                <div className="relative group">
                  <div className="rounded-full h-28 w-28 object-cover bg-dark">
                    <img
                      src={userInfo?.image}
                      alt="Profile"
                      className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-30 rounded-full"
                    />
                  </div>
                  <label
                    className="absolute inset-0 bg-gray-700 bg-opacity-50 text-white text-lg cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ textAlign: "center" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <p>
                          <BsCamera />
                        </p>
                        <p>เปลี่ยนรูป</p>
                      </div>
                    </div>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center my-5">
                <button
                  className={
                    userInfo?.role === "user"
                      ? "btn btn-sm rounded-full bg-white text-dark hover:bg-gradient-to-r from-primaryUser to-secondUser"
                      : userInfo?.role === "business"
                      ? "btn btn-sm rounded-full bg-white text-dark hover:bg-gradient-to-r from-primaryBusiness to-secondBusiness"
                      : userInfo?.role === "admin"
                      ? "btn btn-sm rounded-full bg-white text-dark hover:bg-gradient-to-r from-primaryAdmin to-secondAdmin"
                      : "btn btn-sm rounded-full bg-white text-dark hover:bg-gradient-to-r from-dark to-smoke"
                  }
                >
                  {userInfo?.role === "user" || userInfo?.role === "admin"
                    ? `${userInfo?.name} ${userInfo?.lastName}`
                    : userInfo?.role === "business"
                    ? `${userInfo?.businessName}`
                    : null}
                </button>
              </div>
              {/* Sidebar content here */}
              {userInfo?.role === "user" ? (
                <div>
                  <Link to={"/dashboard-user/ProfileUser"}>
                    <li>
                      <a>Profile</a>
                    </li>
                  </Link>
                  <Link to={"#"}>
                    <li>
                      <a>My Bookings</a>
                    </li>
                  </Link>
                  <Link to={"#"}>
                    <li>
                      <a>My review</a>
                    </li>
                  </Link>
                  <Link to={"#"}>
                    <li>
                      <a>Property messages</a>
                    </li>
                  </Link>
                </div>
              ) : userInfo?.role === "business" ? (
                <div>
                  <Link to={"/dashboard-business/ProfileBusiness"}>
                    <li>
                      <a>Profile</a>
                    </li>
                  </Link>
                  <Link to={"#"}>
                    <li>
                      <a>My Business</a>
                    </li>
                  </Link>
                  <Link to={"#"}>
                    <li>
                      <a>Review</a>
                    </li>
                  </Link>
                  <Link to={"#"}>
                    <li>
                      <a>Property messages</a>
                    </li>
                  </Link>
                </div>
              ) : userInfo?.role === "admin" ? (
                <div>
                  <Link to={"/dashboard-business/ProfileAdmin"}>
                    <li>
                      <a>Profile</a>
                    </li>
                  </Link>
                </div>
              ): null}
              <hr className="h-px my-4 bg-white border-0 dark:bg-gray-300"></hr>
              {userInfo?.role === "user" ? (
                <div>
                  <Link to={"#"}>
                    <li>
                      <a>History Booking</a>
                    </li>
                  </Link>
                </div>
              ) : userInfo?.role === "business" ? (
                <div>
                  <Link to={"#"}>
                    <li>
                      <a>How to get money</a>
                    </li>
                  </Link>
                </div>
              ) : null}
              <li onClick={handleLogout}>
                <a>Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
