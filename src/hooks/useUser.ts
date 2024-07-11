import { useContext } from "react";
import { UserContextProps } from "@/types/user";
import { UserContext } from "@/context/UserContext";

function useUser(): UserContextProps {
  const context = useContext(UserContext);
  return context;
}

export default useUser;
