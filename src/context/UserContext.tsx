import { createContext, ReactNode, useState } from "react";
import { User, UserContextProps } from "@/types/user";

export const UserContext = createContext<UserContextProps>({ user: null, setUser: () => {} });

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserProvider;
