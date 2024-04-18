import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import { RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./context/notification/notificationContext";
import Notification from "./components/notification";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <RouterProvider router={Routes} />
      <Notification />
    </NotificationProvider>
  </React.StrictMode>
);
