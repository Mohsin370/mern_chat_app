import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Chat from "./pages/chat/chat";

const routes = [
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
    element: <Chat />,
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
];

const router = createBrowserRouter(routes);

export default router;
