import Axios from "axios";
const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/message";

interface messageDataType {
  sender: string;
  receiver: string;
  message: string;
  conversationId: string;
}

const SendMessage = (data: messageDataType) => {
  return Axios.post(BASE_API_URL + `/`, data);
};

const getMessages = (id: string) => {
  return Axios.get(BASE_API_URL + `/${id}`);
};

export { SendMessage, getMessages };
