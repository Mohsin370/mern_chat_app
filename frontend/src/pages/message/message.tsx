import { useContext, useEffect, useState } from "react";
import ChatTab from "../../components/chatTab";
import ProfileImg from "../../components/profileImg";
import {  GetAllUsers } from "../../api/user";
import Conversations from "../conversations/conversations";
import { AxiosResponse } from "axios";
import { GetUserConversations } from "../../api/conversations";
import { AuthContext } from "../../context/auth/authContext";
import { Socket } from "socket.io-client";

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

interface MessageModuleProps {
  socket: Socket;
}


export const MessageModule = (props: MessageModuleProps) => {
  const { user } = useContext(AuthContext);
  const [users, setUser] = useState<User[]>([]);
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation<User>>();

  const [chatTabs, setChatTabs] = useState<Conversation<User>[]>([]);

  props.socket.on("receive_message", (data) => {
    if (selectedConversation?._id !== data.conversationId) return;
  });
  props.socket.on("typing_status", (conversationId: string, status: string) => {
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

    // const getOnlineUsers = () =>{

    //   props.socket.on("online", (onl_user_id: string) => {
    //     const online_user = users.find((u) => u._id === onl_user_id);
    //     if (online_user) {
    //       console.log(online_user);
  
    //       setOnlineUsers((prevUsers) => [...prevUsers, online_user]);
    //     }
    //   });
    // }

    GetUserConversations(user.id).then((res: AxiosResponse) => {
      if (res.data.success) {
        setChatTabs(res.data.conversation);
      }
    });
  }, []);

  const selectConversation = (convsersation: Conversation<User>) => {
    setSelectedConversation(convsersation);
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
    setSelectedConversation(conversation);
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
              <div className={`px-2  cursor-pointer pt-2 rounded-md ${selectedConversation?._id === tab._id ? "bg-gray-100 " : ""} `} key={key} onClick={() => selectConversation(tab)}>
                <ChatTab name={tab.user.name} time={""} image={tab.user.image} lastMsg={""} typing={tab.user.typing} />
              </div>
            );
          })}
        </div>
      </div>
      {selectedConversation && (
        <div className="hidden md:block w-full pb-5">
          <Conversations socket={props.socket} conversation={selectedConversation} />
        </div>
      )}
    </div>
  );
};
