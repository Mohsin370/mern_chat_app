import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

type chatContextType = {
  activeConversation: ConversationType;
  setActiveConversation: Dispatch<SetStateAction<ConversationType>>;
  onlineUsers: Array<socketUser>;
  setOnlineUsers: Dispatch<SetStateAction<socketUser[]>>;
};

type ConversationType = {
  conversationId: string;
  receiver: string;
};

type socketUser = {
  socketId: string;
  userId: string;
};

const initialConversation: ConversationType = {
  conversationId: "",
  receiver: "",
};

const initSocketUser: socketUser[] = [{
  socketId: "",
  userId: "",
}];

const defaultContext: chatContextType = {
  activeConversation: initialConversation,
  setActiveConversation: () => {},
  onlineUsers: initSocketUser,
  setOnlineUsers: () => {},
};

export const ChatContext = createContext<chatContextType>(defaultContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeConversation, setActiveConversation] = useState<ConversationType>(initialConversation);
  const [onlineUsers, setOnlineUsers] = useState<socketUser[]>(initSocketUser);

  return <ChatContext.Provider value={{ activeConversation, setActiveConversation, onlineUsers, setOnlineUsers }}>{children}</ChatContext.Provider>;
};
