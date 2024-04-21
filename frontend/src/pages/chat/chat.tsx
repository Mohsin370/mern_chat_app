import { Link, useNavigate } from "react-router-dom";
import { MessageModule } from "../message/message";
import { AuthContext } from "../../context/auth/authContext";
import { useContext } from "react";



const Chat = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser({
      name: "",
      email: "",
      id: "",
      token: "",
    });
    navigate('/');
  };

  return (
    <div className="">
      <div className="flex">
        <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary  px-10  pt-10">
          Ping
        </Link>
        <button className="text-xl bg-secondary text-white px-5 py-3 rounded" onClick={logout}>Logout</button>
      </div>

      <MessageModule></MessageModule>
    </div>
  );
};

export default Chat;
