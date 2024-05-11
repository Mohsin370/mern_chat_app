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

type User = {
  name: string;
  email: string;
  _id: string;
  image: string;
  typing: string;
};

interface Conversation<User> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: User;
}


type socketMessage = {
  message: string;
  sender: string;
  receiver: string;
  conversationId: string;
};

export const MessageModule = () => {
  const { user } = useContext(AuthContext);
  const { activeConversation, setActiveConversation } = useContext(ChatContext);
  const [users, setUser] = useState<User[]>([]);
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation<User>>();

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
        setUser(res.data.users);
      }
    });
    getUserConversations();
  }, [activeConversation, selectedConversation]);

  const getUserConversations = () => {
    GetUserConversations(user.id).then((res: AxiosResponse) => {
      if (res.data.success) {
        setChatTabs(res.data.conversation);
      }
    });
  };

  const selectConversation = (conversation: Conversation<User>) => {
    if(conversation._id === selectedConversation?._id) return;
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
    
    if(conversation._id === selectedConversation?._id) return; 
    setSelectedConversation(conversation);
    const newActiveConversation = {
      receiver: user._id,
      conversationId: conversation._id,
    };
    setActiveConversation(newActiveConversation);
  };

  return (
    <div className="m-auto w-[95%] flex h-5/6 px-2 my-10">
      <div className="w-full md: max-w-sm mr-2 flex flex-col">
        <div className="flex items-center justify-between py-auto my-5">
          <h5 className=" font-extrabold text-2xl">Messages</h5>
          <span className="cursor-pointer">...</span>
        </div>
        <div>
          <input className="bg-slate-100 w-full rounded px-2 py-2 focus:outline-none focus:shadow-secondary-light" placeholder="Search..." />
        </div>
        <div className="flex justify-between items-center mt-4">
          <h4 className="font-bold text-xl">Online now</h4>
          <h4 className="text-secondary">All</h4>
        </div>
        <div className="py-4 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar">
          {users.map((user, key) => (
            <div className="inline-block cursor-pointer mb-2" onClick={() => findUserConversation(user)} key={key}>
              <ProfileImg image={user.image} name={user.name} />
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="mt-6 overflow-x-auto h-full scrollbar">
          {chatTabs?.map((tab, key) => {
            return (
              <div className={`px-2  cursor-pointer pt-2 rounded-md ${activeConversation.conversationId === tab._id ? "bg-gray-100 " : ""} `} key={key} onClick={() => selectConversation(tab)}>
                <ChatTab name={tab.user.name} time={""} image={tab.user.image} lastMsg={""} typing={tab.user.typing} />
              </div>
            );
          })}
        </div>
      </div>
      {selectedConversation && (
        <div className="hidden md:block w-full pb-5">
          <Conversations conversation={selectedConversation} />
        </div>
      )}
    </div>
  );
};
