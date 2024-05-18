import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import { NotificationProvider } from "./context/notification/notificationContext";
import Notification from "./components/notification";
import { AuthContextProvider } from "./context/auth/authContext";
import { ChatContextProvider } from "./context/chat/chatContext";
import { Analytics } from "@vercel/analytics/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <Routes />
          <Analytics></Analytics>
        </ChatContextProvider>
      </AuthContextProvider>
      <Notification />
    </NotificationProvider>
  </React.StrictMode>
);
