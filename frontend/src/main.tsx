import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import { NotificationProvider } from "./context/notification/notificationContext";
import Notification from "./components/notification";
import { AuthContextProvider } from "./context/auth/authContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <Notification />
    </NotificationProvider>
  </React.StrictMode>
);
