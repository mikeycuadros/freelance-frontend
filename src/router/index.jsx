import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import HowWorks from "../pages/HowWorks";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Freelancer from "../pages/Freelancer";
import FreelancerDetail from "../pages/FreelancerDetail";
import Messages from "../pages/Messages";

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
        path: "freelancer",
        element: <Freelancer />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "freelancer/:id",
        element: <FreelancerDetail />,
      },
      {
        path: "how-it-works",
        element: <HowWorks />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
    ],
  },
]);
