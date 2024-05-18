import { useContext, useEffect, useState } from "react";
import ChatTab from "../../components/chatTab";
import ProfileImg from "../../components/profileImg";
import { GetAllUsers } from "../../api/user";
import Conversations from "../conversations/conversations";
import { AxiosResponse } from "axios";
import { GetUserConversations } from "../../api/conversations";
import { AuthContext } from "../../context/auth/authContext";
import { ChatContext } from "../../context/chat/chatContext";
import socket from "../../config/socketConfig";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
  _id: string;
  image: string;
  typing: string;
  online: boolean;
};

interface Conversation<User> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: User;
  lastMessage?: string;
}

type socketMessage = {
  message: string;
  sender: string;
  receiver: string;
  conversationId: string;
  receiverSocketId: string;
};

export const MessageModule = () => {
  const { user, setUser } = useContext(AuthContext);
  const { activeConversation, setActiveConversation, onlineUsers } = useContext(ChatContext);
  const [users, setUsers] = useState<User[]>([]);
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation<User>>();
  const navigate = useNavigate();

  const [chatTabs, setChatTabs] = useState<Conversation<User>[]>([]);

  socket.on("send_message", (data: socketMessage) => {
    console.log("receiver message received as :", data.receiver, user.id);
    if (data.receiver !== user.id) return;
    getUserConversations();
  });
  socket.on("typing_status", (conversationId: string, status: string) => {
    chatTabs?.map((tab) => {
      if (tab._id === conversationId) {
        tab.user.typing = status;
      }
    });
    setChatTabs([...chatTabs!]);
  });

  useEffect(() => {
    GetAllUsers(user.id).then((res: AxiosResponse) => {
      if (res.data.success) {
        res.data.users.map((user: User) => {
          if (onlineUsers.find((ou) => user._id === ou.userId)) {
            user.online = true;
          }
        });

        setUsers(res.data.users);
      }
    });
    getUserConversations();
  }, [activeConversation, selectedConversation]);

  socket.on("receive_message", () => {
    getUserConversations();
  });

  useEffect(() => {
    const updatedUsers = users.map((user: User) => {
      if (onlineUsers.find((ou) => user._id === ou.userId)) {
        user.online = true;
      } else {
        user.online = false;
      }
      return user;
    });

    setUsers(updatedUsers);
  }, [onlineUsers]);

  const getUserConversations = () => {
    GetUserConversations(user.id).then((res: AxiosResponse) => {
      if (res.data.success) {
        setChatTabs(res.data.conversation);
      }
    });
  };

  const selectConversation = (conversation: Conversation<User>) => {
    if (conversation._id === selectedConversation?._id) return;
    setSelectedConversation(conversation);
    const newActiveConversation = {
      conversationId: conversation._id,
      receiver: conversation.user._id,
    };
    setActiveConversation(newActiveConversation);
  };

  const findUserConversation = (user: User) => {
    let conversation = chatTabs?.find((conv) => conv.user._id === user._id);
    if (!conversation) {
      conversation = {
        _id: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
        user: user,
      };
    }

    if (conversation._id === selectedConversation?._id && conversation._id) return;
    setSelectedConversation(conversation);
    const newActiveConversation = {
      receiver: user._id,
      conversationId: conversation._id,
    };
    setActiveConversation(newActiveConversation);
  };
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
    <div className="flex-col-2 m-auto flex h-full divide-x divide-secondary-light">
      <div className={`${selectedConversation ? "hidden md:block" : "block"} flex w-full flex-col px-5 md:max-w-sm`}>
        <div className="py-auto my-5 flex items-center justify-between">
          <h5 className=" text-2xl font-extrabold">Messages</h5>
          <span className="cursor-pointer">
            <ArrowLeftEndOnRectangleIcon className="w-10 text-secondary" onClick={logout} />
          </span>
        </div>
        <div>
          <input className="w-full rounded bg-slate-100 px-2 py-2 focus:shadow-secondary-light focus:outline-none" placeholder="Search..." />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h4 className="text-xl font-bold">Online now</h4>
          <h4 className="text-secondary">All</h4>
        </div>
        <div className="overflow-x-auto overflow-y-hidden whitespace-nowrap py-4 scrollbar">
          {users.map((user, key) => (
            <div className="mb-2 inline-block cursor-pointer" onClick={() => findUserConversation(user)} key={key}>
              <ProfileImg image={user.image} name={user.name} online={user.online} />
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="mt-6 h-full overflow-x-auto scrollbar">
          {chatTabs?.map((tab, key) => {
            return (
              <div
                className={`cursor-pointer  rounded-md px-2 pt-2 ${activeConversation.conversationId === tab._id ? "bg-violet-400 text-white" : ""} `}
                key={key}
                onClick={() => selectConversation(tab)}
              >
                <ChatTab name={tab.user.name} time={""} image={tab.user.image} lastMsg={tab.lastMessage ?? ""} typing={tab.user.typing} />
              </div>
            );
          })}
        </div>
      </div>
      {selectedConversation && (
        <div className="w-full pb-5">
          <Conversations conversation={selectedConversation} />
        </div>
      )}
    </div>
  );
};
