import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import ProfileUser from "../pages/user/profile";
import ProfileAdmin from "../pages/admin/profile";

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
        path: "/profile-admin",
        element: <ProfileAdmin />,
      },
    ],
  },
]);

export default router