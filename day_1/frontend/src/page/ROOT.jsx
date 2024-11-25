import { Link, Outlet } from "react-router-dom";

const ROOT = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-44 mb-10">
      <header>
        <h1 className="text-5xl mb-5 text-center font-bold">Simple CRUD</h1>

        <nav className="mb-10">
          <ul className="flex gap-4 font-semibold">
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            {/* <li>
              <Link to="/findOne">Find One</Link>
            </li>
            <li>
              <Link to="/update">Update</Link>
            </li>
            <li>
              <Link to="/delete">Delete</Link>
            </li> */}
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default ROOT;
