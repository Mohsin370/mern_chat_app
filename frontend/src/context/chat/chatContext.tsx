import { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

type chatContextType = {
  activeConversation: ConversationType;
  setActiveConversation: Dispatch<SetStateAction<ConversationType>>;
};

type ConversationType = {
  conversationId: string;
  receiver: string;
};

const initialConversation: ConversationType = {
  conversationId: "",
  receiver: "",
};

const defaultContext: chatContextType = {
  activeConversation: initialConversation,
  setActiveConversation: () => {},
} as chatContextType;

export const ChatContext = createContext<chatContextType>(defaultContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeConversation, setActiveConversation] = useState<ConversationType>(initialConversation);

  return <ChatContext.Provider value={{ activeConversation, setActiveConversation }}>{children}</ChatContext.Provider>;
};
