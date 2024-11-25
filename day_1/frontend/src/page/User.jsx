import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const User = () => {
  const [user, setUser] = useState([]);

  const users = useLoaderData();

  const handelItemDelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });

        const filterData = user.filter((userData) => userData._id !== id);
        setUser(filterData);
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  useEffect(() => {
    setUser(users);
  }, [users]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">User</h1>

      <div className="grid grid-cols-5 gap-4">
        {user.map((userData) => {
          return (
            <div className="space-y-3 border p-5 rounded-lg" key={userData._id}>
              <Link to={`/findOne/${userData._id}`}>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
              </Link>

              <p>{userData.email}</p>
              <p>{userData.phone}</p>
              <div className="flex gap-4">
                <Link to={`/update/${userData._id}`}>
                  <button className="btn btn-primary">Update</button>
                </Link>
                <button
                  onClick={() => handelItemDelete(userData._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default User;
