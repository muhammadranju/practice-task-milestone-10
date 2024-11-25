// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./page/User.jsx";
import CreateUser from "./page/CreateUser.jsx";
import FindOneUser from "./page/FindOneUser.jsx";
import UpdateUser from "./page/UpdateUser.jsx";
import DeleteUser from "./page/DeleteUser.jsx";
import ROOT from "./page/ROOT.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ROOT />,
    children: [
      {
        path: "users",
        element: <User />,
        loader: () => fetch("http://localhost:3000/users"),
      },
      {
        path: "create",
        element: <CreateUser />,
      },
      {
        path: "findOne/:id",
        element: <FindOneUser />,
      },
      {
        path: "update/:id",
        element: <UpdateUser />,
      },
      {
        path: "delete/:id",
        element: <DeleteUser />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
