import Axios from "axios";
import { IUserLogin } from "../interface/user";

const baseURL = import.meta.env.VITE_REACT_API_URL + "/user";

const LoginApi = (data: IUserLogin) => {
  return Axios.post(`${baseURL}/login`, data);
};

const SignupAPi = (data: IUserLogin) => {
  return Axios.post(`${baseURL}/signup`, data);
};

export { LoginApi, SignupAPi };
