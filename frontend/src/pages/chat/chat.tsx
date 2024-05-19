// import { Link, useNavigate } from "react-router-dom";
import { MessageModule } from "../message/message";
import { AuthContext } from "../../context/auth/authContext";
import { useContext, useEffect } from "react";
import socket from "../../config/socketConfig";
import { ChatContext } from "../../context/chat/chatContext";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { setOnlineUsers } = useContext(ChatContext);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log("Registering user with id as: ", user.id);
    if (user.id) {
      socket.auth = {
        //Add user in socket auth and then make connection
        userId: user.id,
      };
      socket.connect();
    }

    socket.on("connect_error", (err) => {
      if (err.message === "invalid_user") {
        console.log("Invalid User detected!");
        //Error notification may need to be displayed here
      }
      console.log(err);
    });

    socket.on("disconnect", (reason: string) => {
      console.log("Disconnected from socket:", reason);
    });
    socket.on("error", (error: Error) => {
      console.error("Socket connection error:", error.message);
    });
    socket.on("users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      console.log("Cleaning up socket connection");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [user.id]);

  return (
    <div className="h-dvh overflow-hidden">
      <MessageModule></MessageModule>
    </div>
  );
};

export default Chat;
