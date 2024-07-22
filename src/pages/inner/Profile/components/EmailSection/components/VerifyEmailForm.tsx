import { handleFormSubmission } from "@/utils/helpers";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import ProfileForm from "../../ProfileForm";

function VerifyEmailForm({ close, openCodeVerificationForm }: { close: () => void; openCodeVerificationForm: () => void }) {
  const privateRequest = usePrivateRequest();

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <ProfileForm
      title="Verify your email"
      submitLabel="Send"
      loading={loading}
      error={error}
      closeForm={close}
      onSubmit={(event) => {
        handleFormSubmission(event, {}, setLoading, setError, async () => {
          await privateRequest({
            method: "POST",
            url: "profile/verify-email/mail-code",
          });
          openCodeVerificationForm();
        });
      }}
    >
      <p className="text-center">Send a verification code to your email?</p>
    </ProfileForm>
  );
}

export default VerifyEmailForm;
