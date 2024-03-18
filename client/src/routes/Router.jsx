import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import ProfileUser from "../pages/user/profile";
import ProfileBusiness from "../pages/business/profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [    
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