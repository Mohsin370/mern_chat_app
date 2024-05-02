import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export type Auth = {
  email: string;
  token: string;
  name: string;
  id: string;
};

const initUser: Auth = {
  email: "",
  token: "",
  name: "",
  id: ""
};

interface authContextType {
  user: Auth;
  setUser: Dispatch<SetStateAction<Auth>>;
}

const defaultAuthContext: authContextType = {
  user: initUser,
  setUser: () => {},
} as authContextType;

export const AuthContext = createContext<authContextType>(defaultAuthContext);

type NotificationProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: NotificationProviderProps) => {
  const [user, setUser] = useState<Auth>(initUser);


  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
