import Drawer from "../components/Drawer";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const DashBoard = () => {
  return (
    <div>
      <div className="flex">
        <Drawer />
        <div className="md:w-1.5/4 ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
