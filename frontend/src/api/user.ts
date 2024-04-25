import Axios from "axios";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/user";

const GetUsers = (id: string) => {
  return Axios.get(`${baseURL}/${id}`);
};


export { GetUsers };
