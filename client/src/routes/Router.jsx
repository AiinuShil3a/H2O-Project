import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import ProfileUser from "../pages/user/profile";
import ProfileBusiness from "../pages/business/profile";
import Package from "../components/Package";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [    

      {
        path: "/home",
        element: <Package />,
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