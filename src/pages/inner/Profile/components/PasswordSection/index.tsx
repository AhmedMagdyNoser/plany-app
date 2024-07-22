import { useState } from "react";
import UpdatingForm from "./components/UpdatingForm";
import SVGIcon from "@/components/icons/SVGIcon";

function PasswordSection() {
  const [updatingMode, setUpdatingMode] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <section className="flex-center flex-col gap-3">
      <p>Password</p>
      {success ? (
        <SuccessMessage />
      ) : updatingMode ? (
        <UpdatingForm closeForm={() => setUpdatingMode(false)} success={() => setSuccess(true)} />
      ) : (
        <button className="btn-basic" onClick={() => setUpdatingMode(true)}>
          Change Password
        </button>
      )}
    </section>
  );
}

export default PasswordSection;

function SuccessMessage() {
  return (
    <div className="flex-center mx-auto w-[315px] max-w-full animate-fade-in flex-col gap-5 py-4">
      <span className="brdr-basic-3 flex-center h-20 w-20 rounded-full border text-3xl">
        <SVGIcon.CheckedCircle className="txt-green" />
      </span>
      <p className="text-center">Password changed successfully</p>
    </div>
  );
}
