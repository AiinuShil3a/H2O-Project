import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import Home from "../pages/home/Home";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

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
        path: "signin",
        element: <Signin />,
      },

      {
        path: "signup",
        element: <Signup />,
      },

    ],
  },
]);



export default router