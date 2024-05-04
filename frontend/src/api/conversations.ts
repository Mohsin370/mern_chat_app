import Axios from "axios";

const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/conversations";
const token: string = JSON.parse(localStorage.getItem("user") ?? "{}").token;

const GetConversations = (conversationId: string) => {
  return Axios.get(BASE_API_URL + `/${conversationId}`, {
    headers: {
      token,
    },
  });
};

const GetUserConversations = (user: string) => {
  return Axios.get(BASE_API_URL + `/user/${user}`, {
    headers: {
      token,
    },
  });
};

export { GetConversations, GetUserConversations };
