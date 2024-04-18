import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Chat from "./pages/chat/chat";
import FallBack from "./pages/fallBack/fallBack";

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
    element: <FallBack/>,
  },
];

const router = createBrowserRouter(routes);

export default router;
