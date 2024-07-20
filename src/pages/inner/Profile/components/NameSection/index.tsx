import SVGIcon from "@/components/icons/SVGIcon";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import UpdatingForm from "./components/UpdatingForm";

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
            <button
              onClick={() => setUpdatingMode(true)}
              className="btn-primary-light absolute top-1/2 -translate-y-1/2 rounded-full p-[5px]"
              style={{ left: "calc(100% + 10px)" }}
            >
              <SVGIcon.Edit size={12} />
            </button>
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
