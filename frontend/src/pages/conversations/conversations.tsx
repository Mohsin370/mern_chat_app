import { useContext, useEffect, useState, useRef } from "react";
import ProfileImg from "../../components/profileImg";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { SendMessage } from "../../api/chat";
import { AuthContext } from "../../context/auth/authContext";
import { AxiosError } from "axios";
import { GetConversations } from "../../api/conversations";
import { ChatContext } from "../../context/chat/chatContext";
import { Socket } from "socket.io-client";

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
  socket: Socket;
}

export default function Conversations(props: ConversationPropsType) {
  const [chatMessage, setChatMessage] = useState<string>("");
  const { user } = useContext(AuthContext);
  const { activeConversation, setActiveConversation } = useContext(ChatContext);
  const [conversation, setConversation] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const { scrollHeight } = messagesEndRef.current;
      messagesEndRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    console.log("effect", props.socket.id);
    getConversations(activeConversation.conversationId);

    props.socket.on("receive_message", (messageData) => {
      console.log("receiver message received as :", messageData.conversationId, activeConversation.conversationId);
      if (activeConversation.conversationId !== messageData.conversationId) return;
      setConversation((prev) => (prev ? [...prev, messageData] : [messageData]));
    });

    scrollToBottom();

    return () => {
      setConversation([
        {
          message: "",
          sender: "",
          receiver: "",
        },
      ]);
      props.socket.off("receive_message");
    };
  }, [activeConversation, props.socket]);

  const getConversations = (conversationId: string) => {
    console.log(conversationId);
    GetConversations(conversationId)
      .then((res) => {
        console.log(res.data);
        scrollToBottom();

        if (res.data.conversation[0]) {
          setConversation(res.data.conversation[0].messages);
        } else {
          setConversation(res.data.conversation[0]);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (chatMessage.length === 0) return;

    const messageData = {
      sender: user.id,
      receiver: activeConversation.receiver,
      message: chatMessage,
      conversationId: activeConversation.conversationId,
    };

    setConversation((prev) => (prev ? [...prev, messageData] : [messageData]));

    SendMessage(messageData)
      .then((res) => {
        if (res.data.success) {
          if (!activeConversation.conversationId) {
            setActiveConversation({
              conversationId: res.data.conversationId,
              receiver: activeConversation.receiver,
            });
          }
          console.log("message sent");
          props.socket.emit("send_message", messageData);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    scrollToBottom();

    setChatMessage("");
  };

  const onChangeHandler = (message: string) => {
    setChatMessage(message);
    if (message.length === 0) {
      props.socket.emit("typing_status", activeConversation.conversationId, conversation[conversation.length - 1].message);
      return;
    }
    props.socket.emit("typing_status", activeConversation.conversationId, "Typing");
  };

  return (
    <div className="h-full px-2">
      <div className="w-100 flex px-5">
        <ProfileImg image={props.conversation.user.image} name={props.conversation.user.name} />
        <h3 className=" text-3xl font-bold">{props.conversation.user.name}</h3>
      </div>
      <hr className="my-4" />

      <div className="bg-gray-100 h-[94%] px-5 py-5 relative rounded-sm">
        <div className="h-[90%] overflow-y-auto" ref={messagesEndRef}>
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
