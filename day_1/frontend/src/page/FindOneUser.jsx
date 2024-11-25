import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FindOneUser = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();

  console.log(params);

  const getData = async () => {
    const res = await fetch(`http://localhost:3000/users/${params.id}`);
    const data = await res.json();
    setLoading(false);
    setUser(data);
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
          <h1>Find One User</h1>
          <p>ID: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </>
      )}
    </div>
  );
};

export default FindOneUser;
