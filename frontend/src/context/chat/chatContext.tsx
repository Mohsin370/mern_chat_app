import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";
import { Socket, io } from "socket.io-client";
const chatSocket = io(import.meta.env.VITE_REACT_BACKEND);



type socketContextType = {
  socket: Socket;
  setSocket: Dispatch<SetStateAction<any>>;
};

const defaultContext = {
  socket: chatSocket,
  setSocket: () => {},
};

export const ChatContext = createContext<socketContextType>(defaultContext);


export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>(chatSocket);

  return <ChatContext.Provider value={{ socket, setSocket }}>{children}</ChatContext.Provider>;
};
