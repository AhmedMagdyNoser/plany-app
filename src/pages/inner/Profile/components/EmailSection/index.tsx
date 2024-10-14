import { useState } from "react";
import useUser from "@/hooks/useUser";
import solidIcons from "@/components/icons/solid";
import MiniUpdateButton from "../MiniUpdateButton";
import UpdateEmailForm from "./components/UpdateEmailForm";
import CodeVerificationForm from "./components/CodeVerificationForm";
import VerifyEmailForm from "./components/VerifyEmailForm";

export type VerificationPurpose = "Change Email" | "Verify Email";

function EmailSection() {
  const { user } = useUser();

  const [updateEmailFormOpened, setUpdateEmailFormOpened] = useState<boolean>(false);
  const [verifyEmailFormOpened, setVerifyEmailFormOpened] = useState<boolean>(false);
  const [codeVerificationFormOpened, setCodeVerificationFormOpened] = useState<boolean>(false);
  const [purpose, setPurpose] = useState<VerificationPurpose>(user?.emailVerified ? "Change Email" : "Verify Email");

  if (!user) return null;

  function openCodeVerificationForm(purpose: VerificationPurpose) {
    setUpdateEmailFormOpened(false);
    setVerifyEmailFormOpened(false);
    setCodeVerificationFormOpened(true);
    setPurpose(purpose);
  }

  function close() {
    setUpdateEmailFormOpened(false);
    setVerifyEmailFormOpened(false);
    setCodeVerificationFormOpened(false);
  }

  return (
    <section className="flex-center w-full">
      {updateEmailFormOpened ? (
        <UpdateEmailForm close={close} openCodeVerificationForm={() => openCodeVerificationForm("Change Email")} />
      ) : verifyEmailFormOpened ? (
        <VerifyEmailForm close={close} openCodeVerificationForm={() => openCodeVerificationForm("Verify Email")} />
      ) : codeVerificationFormOpened ? (
        <CodeVerificationForm close={close} purpose={purpose} />
      ) : (
        <div className="flex-center animate-fade-in flex-col gap-3 sm:gap-4">
          <div className="flex-center relative flex-wrap gap-2">
            <p className="text-center">{user.email}</p>
            <span>
              {user.emailVerified ? (
                <div className="txt-green flex gap-1">
                  <solidIcons.CheckedCircle size={15} />
                  <span>Verified</span>
                </div>
              ) : (
                <div className="txt-red flex gap-1">
                  <solidIcons.XmarkCircle size={15} />
                  <span>Not verified</span>
                </div>
              )}
            </span>
            {user.emailVerified && <MiniUpdateButton onClick={() => setUpdateEmailFormOpened(true)} />}
          </div>

          {!user.emailVerified && (
            <>
              <p className="text-center">Secure your account by verifying your email.</p>
              <div className="flex-center gap-2">
                <button className="btn-basic" onClick={() => setUpdateEmailFormOpened(true)}>
                  Change Email
                </button>
                <button className="btn-basic" onClick={() => setVerifyEmailFormOpened(true)}>
                  Verify Email
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default EmailSection;
