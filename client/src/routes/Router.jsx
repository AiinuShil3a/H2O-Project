import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import Home from "../pages/home/Home";
import Signin from "../components/Signin";

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

    

    ],
  },
]);



export default router