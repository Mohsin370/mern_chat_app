import { Link, useNavigate } from "react-router-dom";
import { MessageModule } from "../message/message";
import { AuthContext } from "../../context/auth/authContext";
import { useContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import axios from "axios";

const Chat = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const socket: Socket = io(import.meta.env.VITE_REACT_BACKEND);

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });
    socket.on("disconnect", (reason: string) => {
      console.log("Disconnected from socket:", reason);
    });
    socket.on("error", (error: Error) => {
      console.error("Socket connection error:", error.message);
    });

    return () => {
      console.log("Cleaning up socket connection");
      socket.disconnect();
    };
  }, [socket]);

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
    <div className="h-dvh">
      <div className="flex w-[95%] m-auto justify-between items-center pt-5">
        <Link to="/" className="text-5xl font-gilroy-bold cursor-pointer text-secondary  ">
          Ping
        </Link>
        <div>
          <button className="text-lg bg-secondary text-white px-5 py-2 rounded" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <MessageModule socket={socket}></MessageModule>
    </div>
  );
};

export default Chat;
