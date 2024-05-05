import Axios from "axios";

const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/conversations";

const GetConversations = (conversationId: string) => {
  return Axios.get(BASE_API_URL + `/${conversationId}`);
};

const GetUserConversations = (user: string) => {
  return Axios.get(BASE_API_URL + `/user/${user}`);
};

export { GetConversations, GetUserConversations };
