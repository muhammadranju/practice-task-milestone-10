import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import swal from "sweetalert";

const AddUser = () => {
  const handelUserSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const status = form.status.value;
    const photo = form.photo.value;

    const usersInfo = { name, email, gender, status, photo };

    const response = await fetch(
      "https://backend-ten-flax-88.vercel.app/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usersInfo),
      }
    );

    form.reset();
    const user = await response.json();
    if (user?.success) {
      swal({
        title: "Success!",
        text: "Successfully added a new user.",
        icon: "success",
      });
    } else {
      swal({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
      });
    }

    console.log(response);
    console.log(user);
  };
  return (
    <>
      {/* Container */}

      <div className="max-w-4xl mx-auto mt-10 border border-gray-300 shadow-md bg-white rounded-lg">
        {/* Header */}
        <div className="bg-green-500 text-white text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold">User Management System</h1>
        </div>
        {/* Back Link */}
        <div className="p-4">
          <Link
            to="/"
            className="bg-purple-500 text-white w-fit py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
          >
            <FaUserCircle />
            <span>All Users</span>
          </Link>
        </div>
        {/* Form */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-center">New User</h2>
          <p className="text-gray-500 text-center mb-6">
            Use the below form to create a new account
          </p>
          <form onSubmit={handelUserSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-gray-700 font-medium"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photo"
                name="photo"
                placeholder="Enter photo url"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Gender Radio Buttons */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={"Male"}
                    className="form-radio text-green-500"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={"Female"}
                    className="form-radio text-green-500"
                    defaultChecked=""
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            {/* Status Radio Buttons */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={"Active"}
                    className="form-radio text-green-500"
                    defaultChecked=""
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={"Inactive"}
                    className="form-radio text-green-500"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>
            {/* Save Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
