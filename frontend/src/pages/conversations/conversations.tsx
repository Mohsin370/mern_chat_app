import { useContext, useEffect, useState } from "react";
import ProfileImg from "../../components/profileImg";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { SendMessage } from "../../api/chat";
import { AuthContext } from "../../context/auth/authContext";
import { AxiosError } from "axios";
import { GetConversations } from "../../api/conversations";
import { ChatContext } from "../../context/chat/chatContext";

type User = {
  name: string;
  email: string;
  _id: string;
  image: string;
};

interface Conversation<User> {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  user: User;
}

interface Message {
  message: string;
  sender: string;
  receiver: string;
}

interface ConversationPropsType {
  conversation: Conversation<User>;
}

export default function Conversations(props: ConversationPropsType) {
  const [chatMessage, setChatMessage] = useState<string>("");
  const { user } = useContext(AuthContext);
  const {socket} = useContext(ChatContext);
  const [conversation, setConversation] = useState<Message[]>([]);

  useEffect(() => {
    getConversations();
    socket.on("receive_message", (data) => {
      if (props.conversation._id !== data.conversationId) return;
      setConversation((prev) => {
        if (prev) {
          return [...prev, data];
        } else {
          return [data];
        }
      });
    });
  }, [props.conversation._id]);

  const getConversations = (conversationId?: string) => {
    GetConversations(conversationId ?? props.conversation._id)
      .then((res) => {
        console.log(res.data);
        if (res.data.conversation[0]) {
          setConversation(res.data.conversation[0].messages);
        } else {
          setConversation(res.data.conversation[0]);
          console.log(res.data.message);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (chatMessage.length === 0) return;

    socket.emit("send_message", {
      sender: user.id,
      receiver: props.conversation.user._id,
      message: chatMessage,
      conversationId: props.conversation._id,
    });

    SendMessage({ sender: user.id, receiver: props.conversation.user._id, message: chatMessage, conversationId: props.conversation._id })
      .then((res) => {
        if (!props.conversation._id) {
          console.log(res.data);
        }
        getConversations(res.data.conversationId);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setChatMessage("");
  };

  const onChangeHandler = (message: string) => {
    setChatMessage(message);
    if (message.length === 0) {
      socket.emit("typing_status", props.conversation._id, conversation[conversation.length - 1].message);
      return;
    }
    socket.emit("typing_status", props.conversation._id, "Typing");
  };

  return (
    <div className="h-full px-2">
      <div className="w-100 flex px-5">
        <ProfileImg image={props.conversation.user.image} name={props.conversation.user.name} />
        <h3 className=" text-3xl font-bold">{props.conversation.user.name}</h3>
      </div>
      <hr className="my-4" />

      <div className="bg-gray-100 h-[94%] px-5 py-5 relative rounded-sm">
        <div className="h-[90%] overflow-y-auto">
          {conversation?.map((el, key) => (
            <div key={key}>
              {el.sender === user.id ? (
                <div className="justify-end flex my-3 items-center">
                  <div className="flex flex-col items-end">
                    <p className="pr-1 text-right">{user.name}</p>
                    <p className=" bg-secondary text-white rounded p-2 w-fit">{el.message}</p>
                  </div>
                  <div className="ml-2">
                    <ProfileImg image="" name={user.name} />
                  </div>
                </div>
              ) : (
                <div className="justify-start flex my-3 items-center">
                  <div className="mr-2">
                    <ProfileImg image="" name={props.conversation.user.name} />
                  </div>
                  <div>
                    <p className="pl-1">{props.conversation.user.name}</p>
                    <p className=" bg-gray-300 rounded p-2 w-fit">{el.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form className="absolute left-0 bottom-0 justify-center flex w-full" onSubmit={(e) => sendMessage(e)}>
          <textarea
            className="focus:outline-none focus:shadow-secondary px-3 py-2 w-full border border-violet-100 resize-none overflow-hidden"
            placeholder="Write a message..."
            value={chatMessage}
            onChange={(e) => onChangeHandler(e.target.value)}
          />
          <button type="submit" className=" bg-secondary text-white px-7 py-2 rounded-sm">
            <PaperAirplaneIcon className="h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
