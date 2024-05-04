import Axios from "axios";
const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/user";
const token: string = JSON.parse(localStorage.getItem("user") ?? "{}").token;

const GetAllUsers = (id: string) => {
  return Axios.get(BASE_API_URL + `/${id}`, {
    headers: {
      token,
    },
  });
};

export { GetAllUsers };
