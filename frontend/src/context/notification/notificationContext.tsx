import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

export type Notification = {
  message: string;
  type: string;
  show: boolean;
};

const initNotification: Notification = {
  message: "",
  type: "",
  show: false,
};

interface NotificationContextType {
  notification: Notification;
  setNotification: Dispatch<SetStateAction<Notification>>;
}

const defaultNotificationContext: NotificationContextType = {
  notification: initNotification,
  setNotification: () => {},
} as NotificationContextType;

export const NotificationContext = createContext<NotificationContextType>(defaultNotificationContext);

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification>(initNotification);

  return <NotificationContext.Provider value={{ notification, setNotification }}>{children}</NotificationContext.Provider>;
};
