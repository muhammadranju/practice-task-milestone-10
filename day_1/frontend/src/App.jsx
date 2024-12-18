import { useState } from "react";

function App() {
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
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  return (
    <>
      <h1>Simple CRUD</h1>

      <form onSubmit={handelUserData}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" />

        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
