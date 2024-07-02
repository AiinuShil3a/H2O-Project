import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import PrivateRouterUser from "../PrivateRouter/PrivateRouterUser";
import PrivateRouterBusiness from "../PrivateRouter/PrivateRouterBusiness";
import PrivateRouterAdmin from "../PrivateRouter/PrivateRouterAdmin";
import PrivateVerifyEmail from "../PrivateRouter/PrivateVerifyEmail";
import Home from "../pages/home/homepage";
import VerifyEmailSuccess from "../pages/orther/emailIsVerify";
import ProfileUser from "../pages/user/profile";
import ProfileBusiness from "../pages/business/profile";
import SelectionCreate from "../pages/business/selectionCreate";
import DrawerDashBoard from "../layout/DrawerDashBoard";

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
        path: "/verifySuccess/:token",
        element: (
          <PrivateVerifyEmail>
            <VerifyEmailSuccess />
          </PrivateVerifyEmail>
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
      {
        path:"/dashboard-user",
        element:(
          <PrivateRouterUser>
            <DrawerDashBoard />
          </PrivateRouterUser>
        ),
        children: [
          {
            path: "/dashboard-user/ProfileUser",
            element: <ProfileUser />
          },
        ]
      },
      {
        path:"/dashboard-business",
        element:(
          <PrivateRouterBusiness>
            <DrawerDashBoard />
          </PrivateRouterBusiness>
        ),
        children: [
          {
            path: "/dashboard-business/ProfileBusiness",
            element: <ProfileBusiness />
          },
        ]
      },
      {
        path:"/dashboard-admin",
        element:(
          <PrivateRouterAdmin>
            <DrawerDashBoard />
          </PrivateRouterAdmin>
        ),
        children: [
          {
            path: "/dashboard-admin/ProfileAdmin",
            element: <ProfileBusiness />
          },
        ]
      }
    ],
  },
]);

export default router;
