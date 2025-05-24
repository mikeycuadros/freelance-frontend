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
import Chats from "../pages/Chats";
import ChatDetail from "../pages/ChatDetail";
import CategoryDetail from "../pages/CategoryDetail";

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
        path: "freelancer/:id",
        element: <FreelancerDetail />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:id",
        element: <CategoryDetail />,
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
        path: "chats",
        element: <Chats />,
      },
      {
        path: "chat/:id",
        element: <ChatDetail />,
      },
    ],
  },
]);
