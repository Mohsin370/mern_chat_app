import Axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/user";

const GetAllUsers = (id: string) => {
  return Axios.get(`${baseURL}/${id}`);
};



export { GetAllUsers };
