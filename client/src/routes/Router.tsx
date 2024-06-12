import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import PrivateRouterUser from "../PrivateRouter/PrivateRouterUser";
import PrivateRouterBusiness from "../PrivateRouter/PrivateRouterBusiness";
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
        element: (
          <PrivateRouterUser>
            <ProfileUser />
          </PrivateRouterUser>
        ),
      },
      {
        path: "/profile-business",
        element: (
          <PrivateRouterBusiness>
            <ProfileBusiness />
          </PrivateRouterBusiness>
        ),
      },
      {
        path: "/create-business",
        element: (
          <PrivateRouterBusiness>
            <SelectionCreate />
          </PrivateRouterBusiness>
        ),
      },
    ],
  },
]);

export default router;
