import Axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/user";

const GetUsers = () => {
  return Axios.get(`${baseURL}/`);
};


export { GetUsers };
