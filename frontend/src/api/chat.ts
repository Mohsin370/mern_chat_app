import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/message";
const token: string = JSON.parse(localStorage.getItem("user") ?? "{}").token;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    token,
  },
});

interface messageDataType {
  sender: string;
  receiver: string;
  message: string;
  conversationId: string
}

const SendMessage = (data: messageDataType) => {
  return axiosInstance.post(`/`, data);
};

const getMessages = (id: string) => {
  return axiosInstance.get(`/${id}`);
};

export { SendMessage, getMessages };
