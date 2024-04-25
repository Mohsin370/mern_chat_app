import Axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/conversations";


const GetConversations = (user:string, participant:string) => {
  return Axios.get(`${baseURL}/${user}/${participant}`);
};

const GetUserConversations = (user:string) => {
  return Axios.get(`${baseURL}/${user}`);
};

export {  GetConversations, GetUserConversations };
