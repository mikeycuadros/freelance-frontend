import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

import RootLayout from "../layout/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);