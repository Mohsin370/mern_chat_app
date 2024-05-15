import { Navigate, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Chat from "./pages/chat/chat";
import FallBack from "./pages/fallBack/fallBack";
import { Auth, AuthContext } from "./context/auth/authContext";
import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NotificationContext } from "./context/notification/notificationContext";

const publicRoutes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/chat",
    element: <Navigate to="/" replace />,
  },
  {
    path: "*",
    element: <FallBack />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Navigate to="/chat" replace />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "*",
    element: <Navigate to="/chat" replace />,
  },
];

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const storedUser: Auth = JSON.parse(localStorage.getItem("user") ?? "{}");
  useEffect(() => {
    if (storedUser.token && !user.token) {
      setUser(storedUser);
    }
  }, [storedUser, user.token]);

  if (storedUser.token || user.token) {
    axios.defaults.headers.token = user.token || storedUser.token;
  }

  axios.interceptors.response.use((res: AxiosResponse)=>{
    return res;
  }, (error: AxiosError)=>{
      if(error.response?.status === 401){
        console.log("Unauthorized");
        setNotification({
          message: "Session Expired",
          type: "error",
          show: true
        });
        setUser({
          email: "",
          token: "",
          name: "",
          id: ""
        });
        localStorage.removeItem("user");
        return Promise.reject(error);
      }
    }
  )

  return <RouterProvider router={user.token ? createBrowserRouter(privateRoutes) : createBrowserRouter(publicRoutes)} />;
};

export default Routes;
