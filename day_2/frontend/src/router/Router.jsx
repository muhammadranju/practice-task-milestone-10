import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/findOne/:id",
    element: <div>Find One</div>,
  },
  {
    path: "/update/:id",
    element: <div>Update</div>,
  },
  {
    path: "/user",
    element: <div>User</div>,
  },
]);

export default Router;
