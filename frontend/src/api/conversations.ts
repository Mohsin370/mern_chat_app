import Axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/conversations";


const GetConversations = (conversationId: string) => {
  return Axios.get(`${baseURL}/${conversationId}`);
};

const GetUserConversations = (user:string) => {
  return Axios.get(`${baseURL}/user/${user}`);
};

export {  GetConversations, GetUserConversations };
