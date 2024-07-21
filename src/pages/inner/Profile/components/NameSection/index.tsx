import { useState } from "react";
import useUser from "@/hooks/useUser";
import useLogout from "@/hooks/useLogout";
import UpdatingForm from "./components/UpdatingForm";
import MiniUpdateButton from "../MiniUpdateButton";

function NameSection() {
  const { user } = useUser();
  const logout = useLogout();

  const [updatingMode, setUpdatingMode] = useState<boolean>(false);

  if (!user) return null;

  return (
    <section className="flex-center w-full flex-col gap-2">
      {!updatingMode ? (
        <>
          <div className="relative">
            <h1 className="text-center tracking-tighter">{user.fullName}</h1>
            <MiniUpdateButton onClick={() => setUpdatingMode(true)} />
          </div>
          <p className="text-center">Joined on {new Date(user.createdAt).toDateString()}</p>
          <button className="btn-basic mt-4" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <UpdatingForm closeForm={() => setUpdatingMode(false)} />
      )}
    </section>
  );
}

export default NameSection;
