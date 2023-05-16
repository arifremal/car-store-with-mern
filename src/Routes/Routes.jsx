import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Registration/Signup";

import Book from "../pages/Book/Book";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path:'book/:id',
        element:<Book></Book>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
        
      },
      {
        path:'/bookings',
        element:<PrivateRoute><Bookings></Bookings></PrivateRoute>
      },
    ],
  },
]);
export default router;
