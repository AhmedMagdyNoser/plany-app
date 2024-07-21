import { useState } from "react";
import { VerificationPurpose } from "@/types/verificationPurpose";
import useUser from "@/hooks/useUser";
import SVGIcon from "@/components/icons/SVGIcon";
import MiniUpdateButton from "../MiniUpdateButton";
import UpdatingForm from "./components/UpdatingForm";
import VerificationForm from "./components/VerificationForm";
import { apiRequest } from "@/utils/api";
import useFetchingStatus from "@/hooks/useFetchingStatus";

function EmailSection() {
  const { user } = useUser();

  const [updatingMode, setUpdatingMode] = useState<boolean>(false);
  const [verificationMode, setVerificationMode] = useState<boolean>(false);
  const [purpose, setPurpose] = useState<VerificationPurpose>(user?.emailVerified ? "Change Email" : "Verify Email");

  const { loading, setLoading } = useFetchingStatus();

  if (!user) return null;

  function openUpdatingForm() {
    setUpdatingMode(true);
  }

  function openVerificationForm(purpose: VerificationPurpose) {
    setUpdatingMode(false);
    setVerificationMode(true);
    setPurpose(purpose);
  }

  function close() {
    setUpdatingMode(false);
    setVerificationMode(false);
  }

  async function sendVerifyEmailCode() {
    try {
      setLoading(true);
      await apiRequest({
        method: "POST",
        url: "auth/send-verification-code",
        data: { email: user?.email, purpose: "Verify Email" },
      });
      openVerificationForm("Verify Email");
    } catch (error) {
      console.dir(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex-center flex-col gap-3 sm:gap-4">
      {updatingMode ? (
        <UpdatingForm closeForm={close} openVerificationForm={openVerificationForm} />
      ) : verificationMode ? (
        <VerificationForm closeForm={close} purpose={purpose} />
      ) : (
        <>
          <div className="flex-center relative flex-wrap gap-2">
            <p className="text-center">{user.email}</p>
            <span>
              {user.emailVerified ? (
                <div className="txt-green flex gap-1">
                  <SVGIcon.CheckedCircle size={15} />
                  <span>Verified</span>
                </div>
              ) : (
                <div className="txt-red flex gap-1">
                  <SVGIcon.XCircle size={15} />
                  <span>Not verified</span>
                </div>
              )}
            </span>
            {user.emailVerified && <MiniUpdateButton onClick={openUpdatingForm} />}
          </div>

          {!user.emailVerified && (
            <>
              <p>Secure your account by verifying your email.</p>
              <div className="flex-center gap-2">
                <button className="btn-basic" onClick={openUpdatingForm}>
                  Change Email
                </button>
                <button className="btn-basic" onClick={sendVerifyEmailCode} disabled={loading}>
                  {loading ? <SVGIcon.Spinner size={15} /> : "Verify Email"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default EmailSection;
