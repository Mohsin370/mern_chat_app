import { useContext, useEffect, useState } from "react";
import ProfileImg from "../../components/profileImg";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { SendMessage } from "../../api/chat";
import { AuthContext } from "../../context/auth/authContext";
import { AxiosError } from "axios";
import { GetConversations } from "../../api/conversations";

type UserProp = {
  name: string;
  email: string;
  _id: string;
  image?: string;
};

export default function Conversations(props: UserProp) {
  const [chatMessage, setChatMessage] = useState<string>("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!props._id) return;

    GetConversations(user.id, props._id)
      .then((res) => {
        console.log(res);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  }, [props._id]);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (chatMessage.length === 0) return;
    setChatMessage("");

    SendMessage({ sender: user.id, receiver: props._id, message: chatMessage })
      .then((res) => {
        console.log(res);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  };

  return (
    <div className="h-full px-2">
      <div className="w-100 flex px-5">
        <ProfileImg image="" name={props.name} />
        <h3 className=" text-3xl font-bold">{props.name}</h3>
      </div>
      <hr className="my-4" />

      <div className="bg-gray-100 h-[94%] px-5 py-5 relative rounded-sm">
        <div className="h-[90%] overflow-y-auto">
          <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
        <form className="absolute left-0 bottom-0 justify-center flex w-full" onSubmit={(e) => sendMessage(e)}>
          <textarea
            className="focus:outline-none focus:shadow-secondary px-3 py-2 w-full border border-violet-100 resize-none overflow-hidden"
            placeholder="Write a message..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <button type="submit" className="bg-violet-500 text-white px-7 py-2 rounded-sm">
            <PaperAirplaneIcon className="h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
