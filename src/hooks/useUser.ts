import { useContext } from "react";
import { UserContextProps } from "@/types/user";
import { UserContext } from "@/context/UserContext";

function useUser(): UserContextProps {
  return useContext(UserContext);
}

export default useUser;
