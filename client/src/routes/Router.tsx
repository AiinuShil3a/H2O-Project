import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import Home from "../pages/home/homepage";
import ProfileUser from "../pages/user/profile";
import ProfileBusiness from "../pages/business/profile";
import SelectionCreate from "../pages/business/selectionCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },    
      {
        path: "/profile-user",
        element: <ProfileUser />,
      },
      {
        path: "/profile-business",
        element: <ProfileBusiness />,
      },
      {
        path: "/create-business",
        element: <SelectionCreate />,
      },
    ],
  },
]);

export default router