import { useContext, useEffect, useState, useRef } from "react";
import ProfileImg from "../../components/profileImg";
import { PaperAirplaneIcon, FaceSmileIcon, PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SendMessage } from "../../api/chat";
import { AuthContext } from "../../context/auth/authContext";
import { AxiosError } from "axios";
import { GetConversations } from "../../api/conversations";
import { ChatContext } from "../../context/chat/chatContext";
import socket from "../../config/socketConfig";
import EmojiPicker from "emoji-picker-react";
import VideoCall from "../../components/videoCall";

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
  const { activeConversation, setActiveConversation, onlineUsers } = useContext(ChatContext);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [startCall, setStartCall] = useState<boolean>(false);

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
      if (activeConversation.conversationId !== messageData.conversationId) return;
      setConversation((prev) => (prev ? [...prev, messageData] : [messageData]));
    });

    socket.on("receiveOfferFromSignalingServer", async () => {
      setStartCall(true);
    });

    return () => {
      setConversation([]);
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
      receiverSocketId: onlineUsers.find((user) => user.userId === activeConversation.receiver)?.socketId,
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
          socket.emit("typing_status", activeConversation.conversationId, false);
        }
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });

    setChatMessage("");
    setShowEmoji(false);
  };

  const onChangeHandler = (message: string) => {
    setChatMessage(message);
    if (message.length === 0) {
      socket.emit("typing_status", activeConversation.conversationId, false);
      return;
    }
    socket.emit("typing_status", activeConversation.conversationId, true);
  };

  return (
    <div className="h-full sm:h-dvh">
      <div className="flex justify-between border border-gray-200 px-5 py-4">
        <div className="flex">
          <ProfileImg image={props.conversation.user.image} name={props.conversation.user.name} />
          <h3 className="text-lg font-bold">{props.conversation.user.name}</h3>
        </div>

        <PhoneArrowUpRightIcon className="w-10 rounded bg-secondary p-2 text-white hover:cursor-pointer" onClick={() => setStartCall(!startCall)} />
      </div>
      <div className="relative h-[94%] rounded-sm bg-gray-100 px-5">
        <div className="h-[calc(100%-70px)] overflow-y-auto pr-3 scrollbar" ref={messagesEndRef}>
          {startCall && <VideoCall />}
          {conversation?.map((el, key) => (
            <div key={key}>
              {el.sender === user.id ? (
                <div className="my-3 flex place-items-start justify-end">
                  <div className="flex flex-col items-end">
                    <p className="pr-1 text-right">{user.name}</p>
                    <p className=" max-w-[400px] whitespace-pre-wrap break-all rounded-b-lg rounded-tl-lg bg-secondary p-2 pl-3 text-white">
                      {el.message}
                    </p>
                  </div>
                  <div className="ml-2 pt-5">
                    <ProfileImg image="" name={user.name} />
                  </div>
                </div>
              ) : (
                <div className="my-3 flex place-items-start justify-start">
                  <div className="mr-2 pt-5">
                    <ProfileImg image="" name={props.conversation.user.name} />
                  </div>
                  <div>
                    <p className="pl-1">{props.conversation.user.name}</p>
                    <p className=" w-fit max-w-[400px] whitespace-pre-wrap break-all rounded-b-lg rounded-tr-lg bg-gray-300 p-2 pr-3">{el.message}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <form
          className="absolute bottom-0 left-0 flex h-16 w-full justify-center"
          onSubmit={(e) => sendMessage(e)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : "")}
        >
          <textarea
            className="w-full resize-none overflow-hidden border border-r-0 border-violet-100 px-3 py-2 focus:shadow-secondary focus:outline-none"
            placeholder="Write a message..."
            value={chatMessage}
            onChange={(e) => onChangeHandler(e.target.value)}
            onClick={() => setShowEmoji(false)}
            contentEditable={true}
            suppressContentEditableWarning={true}
          />
          <div className="relative flex border-y bg-white pr-1 text-secondary focus:shadow-secondary">
            <FaceSmileIcon className="w-8 items-center hover:cursor-pointer " onClick={() => setShowEmoji(!showEmoji)} />
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

          <button type="submit" className=" rounded-sm bg-secondary px-7 py-2 text-white">
            <PaperAirplaneIcon className="h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
