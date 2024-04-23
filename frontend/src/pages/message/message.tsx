import { useEffect, useState } from "react";
import ChatTab from "../../components/chatTab";
import ProfileImg from "../../components/profileImg";
import { GetUsers } from "../../api/user";
import Conversations from "../conversations/conversations";

const chatTabs = [
  {
    name: "Khawaja Mohsin",
    image: "https://lh3.googleusercontent.com/a/ACg8ocLa4rBu43NAksWtSOEH5fEislC5EaBvTQEwFvApENrqV3ZlkqY-=s288-c-no",
    time: "4:42 PM",
    lastMsg: "I love Ping app",
  },
  {
    name: "Mohsin Ijaz",
    image:
      "https://media-syd2-1.cdn.whatsapp.net/v/t61.24694-24/404848781_653767043587857_6955072495903007698_n.jpg?ccb=11-4&oh=01_ASBqASLiJXOELHHWvbokZUNpysfQV4xIFyGftS3kxPbReQ&oe=662B35A6&_nc_sid=e6ed6c&_nc_cat=107",
    time: "4:42 PM",
    lastMsg: "",
  },
  {
    name: "USER",
    image: "",
    time: "4:42 PM",
    lastMsg: "",
  },
];

type User = {
  name: string;
  email: string;
  _id: string;
  image?: string;
};

export const MessageModule = () => {
  const [users, setUser] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({
    name: "",
    email: "",
    _id: "",
  });

  useEffect(() => {
    GetUsers().then((res) => {
      if (res.data.success) {
        setUser(res.data.users);
      }
    });
  }, []);

  const selectUser = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="m-auto w-5/6 flex h-5/6 px-2 my-10 divide-x-2">
      <div className="w-full md:w-1/3 pr-4">
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
        <div className="flex my-3 w-100 cursor-pointer">
          {users.map((user, key) => {
            return (
              <div onClick={() => selectUser(user)} key={key}>
                <ProfileImg image={user.image ? user.image : ""} />
              </div>
            );
          })}
        </div>
        <hr className="my-4" />

        <div className="mt-6">
          {chatTabs.map((tab, key) => {
            return <ChatTab key={key} name={tab.name} time={tab.time} image={tab.image} lastMsg={tab.lastMsg} />;
          })}
        </div>
      </div>
      <div className="hidden md:block w-full pb-5">
        <Conversations {...selectedUser} />
      </div>
    </div>
  );
};
