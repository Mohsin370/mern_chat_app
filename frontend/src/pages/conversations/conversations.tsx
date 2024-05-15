import { useContext, useEffect, useState, useRef } from "react";
import ProfileImg from "../../components/profileImg";
import {
  PaperAirplaneIcon,
  FaceSmileIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/16/solid";
import { SendMessage } from "../../api/chat";
import { AuthContext } from "../../context/auth/authContext";
import { AxiosError } from "axios";
import { GetConversations } from "../../api/conversations";
import { ChatContext } from "../../context/chat/chatContext";
import socket from "../../config/socketConfig";
import EmojiPicker from "emoji-picker-react";

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
  const { activeConversation, setActiveConversation, onlineUsers } =
    useContext(ChatContext);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const { scrollHeight } = messagesEndRef.current;
      messagesEndRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    getConversations(activeConversation.conversationId);
    setChatMessage("");
    setShowEmoji(false);
    console.log(socket.id);

    socket.on("receive_message", (messageData) => {
      console.log(messageData);
      if (activeConversation.conversationId !== messageData.conversationId)
        return;
      setConversation((prev) =>
        prev ? [...prev, messageData] : [messageData]
      );
    });

    return () => {
      setConversation([
        {
          message: "",
          sender: "",
          receiver: "",
        },
      ]);
      socket.off("receive_message");
    };
  }, [activeConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const getConversations = (conversationId: string) => {
    GetConversations(conversationId)
      .then((res) => {
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

    console.log("oneline users", onlineUsers);
    const messageData = {
      sender: user.id,
      receiver: activeConversation.receiver,
      message: chatMessage,
      conversationId: activeConversation.conversationId,
      receiverSocketId: onlineUsers.find(
        (user) => user.userId === activeConversation.receiver
      )?.socketId,
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
          console.log("message sent to: ", messageData);
          socket.emit("send_message", messageData);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });

    setChatMessage("");
  };

  const onChangeHandler = (message: string) => {
    setChatMessage(message);
    if (message.length === 0) {
      socket.emit(
        "typing_status",
        activeConversation.conversationId,
        conversation[conversation.length - 1].message
      );
      return;
    }
    socket.emit("typing_status", activeConversation.conversationId, "Typing");
  };

  return (
    <div className="h-full px-2">
      <div className="w-100 flex justify-between px-5 border py-4 border-gray-200">
        <div className="flex">
          <ProfileImg
            image={props.conversation.user.image}
            name={props.conversation.user.name}
          />
          <h3 className="text-lg font-bold">
            {props.conversation.user.name}
          </h3>
        </div>

        <PhoneArrowUpRightIcon className="w-10 bg-secondary text-white p-2 rounded hover:cursor-pointer" />
      </div>
      {/* <hr className="my-4" /> */}

      <div className="bg-gray-100 h-[94%] px-5 relative rounded-sm">
        <div
          className="h-[91%] overflow-y-auto scrollbar pr-3"
          ref={messagesEndRef}
        >
          {conversation?.map((el, key) => (
            <div key={key}>
              {el.sender === user.id ? (
                <div className="justify-end flex my-3 place-items-start">
                  <div className="flex flex-col items-end">
                    <p className="pr-1 text-right">{user.name}</p>
                    <p className=" bg-secondary text-white rounded-tl-lg rounded-b-lg p-2 pl-3 whitespace-pre-wrap break-all max-w-[400px]">
                      {el.message}
                    </p>
                  </div>
                  <div className="ml-2 pt-5">
                    <ProfileImg image="" name={user.name} />
                  </div>
                </div>
              ) : (
                <div className="justify-start flex my-3 place-items-start">
                  <div className="mr-2 pt-5">
                    <ProfileImg image="" name={props.conversation.user.name} />
                  </div>
                  <div>
                    <p className="pl-1">{props.conversation.user.name}</p>
                    <p className=" bg-gray-300 rounded-tr-lg rounded-b-lg p-2 pr-3 w-fit whitespace-pre-wrap break-all max-w-[400px]">
                      {el.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form
          className="absolute left-0 bottom-0 justify-center flex w-full"
          onSubmit={(e) => sendMessage(e)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : "")}
        >
          <textarea
            className="focus:outline-none focus:shadow-secondary px-3 py-2 w-full border border-r-0 border-violet-100 resize-none overflow-hidden"
            placeholder="Write a message..."
            value={chatMessage}
            onChange={(e) => onChangeHandler(e.target.value)}
            onClick={() => setShowEmoji(false)}
          />
          <div className="relative bg-white focus:shadow-secondary text-secondary border-y pr-1 flex">
            <FaceSmileIcon
              className="w-8 items-center hover:cursor-pointer "
              onClick={() => setShowEmoji(!showEmoji)}
            />
            <div className=" absolute bottom-16 right-0">
              <EmojiPicker
                open={showEmoji}
                onEmojiClick={(el) => {
                  console.log(chatMessage);
                  setChatMessage(chatMessage + el.emoji);
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className=" bg-secondary text-white px-7 py-2 rounded-sm"
          >
            <PaperAirplaneIcon className="h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
