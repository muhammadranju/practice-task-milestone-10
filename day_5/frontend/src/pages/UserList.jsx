import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

import swal from "sweetalert";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const handelDeleteUser = async (id) => {
    console.log(id);

    swal({
      title: "You really want to delete?",
      text: "This will delete your user permanently.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal({
          title: "Success!",
          text: "Successfully deleted a user.",
          icon: "success",
        });
        await fetch(`https://backend-ten-flax-88.vercel.app/users/${id}`, {
          method: "DELETE",
        });

        const user = users.filter((user) => user._id !== id);
        setUser(user);
      } else {
        swal("Request cancelled!", {
          icon: "error",
          dangerMode: true,
        });
      }
    });
  };

  const handelEditUser = async (id) => {
    console.log(id);
    // const response = await fetch(`https://backend-ten-flax-88.vercel.app/users/${id}`, {
    //   method: "PATCH",
    // });
    // const data = await response.json();
    // if (data.acknowledged) {
    //   swal({
    //     title: "Success!",
    //     text: "Successfully edited a user.",
    //     icon: "success",
    //   });
    // }
    // setUser(data);
  };

  useEffect(() => {
    async function getUser() {
      const response = await fetch(
        "https://backend-ten-flax-88.vercel.app/users"
      );
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }
    getUser();
  }, [users]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <BounceLoader color={"#22c55e"} />
        </div>
      ) : null}

      {/* Container */}
      <div className="max-w-5xl mx-auto mt-10 border border-gray-300 shadow-md bg-white rounded-lg">
        {/* Header */}
        <div className="bg-green-500 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">User Management System</h1>
        </div>
        {/* New User Button */}
        <div className="p-4">
          <Link
            to={"/users"}
            className="bg-purple-500 text-white w-fit py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>New User</span>
          </Link>
        </div>
        {/* Table */}
        <div className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">@Email</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}

              {users?.result?.map((user, inx) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{inx + 1}</td>
                  <td className="p-3">
                    <img className="w-12" src={user?.photo} alt="" />
                  </td>
                  <td className="p-3">{user?.name}</td>
                  <td className="p-3">{user?.email}</td>
                  <td className="p-3">{user?.gender}</td>
                  <td
                    className={`p-3 ${
                      user?.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-semibold`}
                  >
                    {user?.status}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handelEditUser(user._id)}
                      className="bg-purple-500 text-white p-2 rounded-md"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handelDeleteUser(user._id)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserList;
