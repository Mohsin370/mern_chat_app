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
    navigate("/");
  };

  return (
    <div className=" h-dvh">
      <div className="flex w-5/6 m-auto justify-between items-center pt-5">
        <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary  ">
          Ping
        </Link>
        <div>
          <button className="text-lg bg-secondary text-white px-5 py-2 rounded" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <MessageModule></MessageModule>
    </div>
  );
};

export default Chat;
