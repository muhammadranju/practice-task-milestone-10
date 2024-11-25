import { useState } from "react";
import swal from "sweetalert";

function CreateUser() {
  const [user, setUser] = useState({});

  const handelUserData = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (data.acknowledged) {
        swal({
          title: "Success!",
          text: "Successfully created a new user.",
          icon: "success",
        });
      }
      setUser(data);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  return (
    <>
      <form onSubmit={handelUserData} className="form-control">
        <label htmlFor="name">Name</label>
        <input
          className="input input-bordered"
          type="text"
          id="name"
          name="name"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          className="input input-bordered"
          type="email"
          id="email"
          name="email"
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <input
          className="input input-bordered"
          type="tel"
          id="phone"
          name="phone"
        />

        <br />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateUser;
