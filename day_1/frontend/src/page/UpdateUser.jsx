import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const UpdateUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  console.log(params);

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/users/${params.id}`);
    const data = await res.json();
    setLoading(false);
    setUser(data);
  };

  const handelUpdateUserData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    try {
      const res = await fetch(`http://localhost:3000/users/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      navigate("/users");
      setLoading(false);
      swal({
        title: "Success!",
        text: "Successfully updated the user.",
        icon: "success",
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <form onSubmit={handelUpdateUserData} className="form-control">
            <label htmlFor="name">Name</label>
            <input
              className="input input-bordered"
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              className="input input-bordered"
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
            />
            <br />
            <label htmlFor="phone">Phone</label>
            <input
              className="input input-bordered"
              type="tel"
              id="phone"
              name="phone"
              defaultValue={user.phone}
            />

            <br />
            <button className="btn" type="submit">
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateUser;
