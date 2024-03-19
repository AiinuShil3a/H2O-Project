import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import Home from "../pages/home/homepage";
import ProfileUser from "../pages/user/profile";
import ProfileBusiness from "../pages/business/profile";

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
    ],
  },
]);

export default router