import Axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/message";

interface messageDataType {
  sender: string;
  receiver: string;
  message: string;
  conversationId: string
}

const SendMessage = (data: messageDataType) => {
  return Axios.post(`${baseURL}/`, data);
};

const getMessages = (id: string) => {
  return Axios.get(`${baseURL}/${id}`);
};

export { SendMessage, getMessages };
