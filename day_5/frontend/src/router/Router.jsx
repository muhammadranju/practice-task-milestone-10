import { createBrowserRouter } from "react-router-dom";
import UserList from "../pages/UserList";
import AddUser from "../pages/AddUser";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/users/",
    element: <AddUser />,
  },
]);

export default Router;
