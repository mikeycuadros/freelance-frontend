import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import Explore from "../pages/Explore";
import HowWorks from "../pages/HowWorks";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "how-it-works",
        element: <HowWorks />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
