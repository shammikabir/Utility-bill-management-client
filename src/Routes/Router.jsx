import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Billdetails from "../pages/Billdetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("http://localhost:3000/bills"),
      },
      {
        path: "/bills/:id",
        Component: Billdetails,
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthenticationLayout,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      //   {
      //     path: "/auth/forgot-password",
      //     Component: ForgotPass,
      //   },
    ],
  },
]);
