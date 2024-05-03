import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_REACT_API_URL + "/user";
const token: string = JSON.parse(localStorage.getItem("user") ?? "{}").token;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    token,
  },
});


const GetAllUsers = (id: string) => {
  return axiosInstance.get(`/${id}`);
};



export { GetAllUsers };
