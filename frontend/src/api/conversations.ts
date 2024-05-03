import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/conversations";
const token: string = JSON.parse(localStorage.getItem("user") ?? "{}").token;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    token,
  },
});

const GetConversations = (conversationId: string) => {
  console.log(axiosInstance);
  return axiosInstance.get(`/${conversationId}`);
};

const GetUserConversations = (user: string) => {
  return axiosInstance.get(`/user/${user}`);
};

export { GetConversations, GetUserConversations };
