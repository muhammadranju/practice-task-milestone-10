import { useParams } from "react-router-dom";

const DeleteUser = () => {
  const params = useParams();

  console.log(params);
  return <div>DeleteUser</div>;
};

export default DeleteUser;
