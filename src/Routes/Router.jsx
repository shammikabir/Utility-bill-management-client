import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import AuthenticationLayout from "../Layout/AuthenticationLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Billdetails from "../pages/Billdetails";
import BillsPage from "../pages/BillsPage";
import ForgotPass from "../pages/ForgetPass";
import PrivateRoute from "../component/PrivateRoute";
import MyPayBills from "../pages/MyPayBills";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch("https://utility-server-two.vercel.app/bills"),
      },
      {
        path: "/bills/:id",
        element: (
          <PrivateRoute>
            <Billdetails></Billdetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/bills",
        Component: BillsPage,
      },
      {
        path: "/myPaybills",
        element: (
          <PrivateRoute>
            <MyPayBills></MyPayBills>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthenticationLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/forgot-password",
        Component: ForgotPass,
      },
    ],
  },
]);
