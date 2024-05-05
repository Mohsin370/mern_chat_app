import { Navigate, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Chat from "./pages/chat/chat";
import FallBack from "./pages/fallBack/fallBack";
import { Auth, AuthContext } from "./context/auth/authContext";
import { useContext, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import axios from "axios";

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
    element: <FallBack />,
  },
];

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  let storedUser: Auth = JSON.parse(localStorage.getItem("user") ?? "{}");
  useEffect(() => {
    if (storedUser.token && !user.token) {
      setUser(storedUser);
    }
  }, [storedUser, user.token]);

  if (storedUser.token || user.token) {
    axios.defaults.headers.token = user.token;
  }

  return <RouterProvider router={user.token ? createBrowserRouter(privateRoutes) : createBrowserRouter(publicRoutes)} />;
};

export default Routes;
