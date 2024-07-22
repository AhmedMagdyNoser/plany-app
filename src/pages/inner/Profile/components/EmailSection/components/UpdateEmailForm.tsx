import { useState } from "react";
import { validationRegex } from "@/utils/validation";
import { handleFormSubmission } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import ProfileForm from "../../ProfileForm";

function UpdateEmailForm({ close, openCodeVerificationForm }: { close: () => void; openCodeVerificationForm: () => void }) {
  const { user } = useUser();

  const privateRequest = usePrivateRequest();

  const [newEmail, setNewEmail] = useState<string>("");

  const isValidEmail = validationRegex.email.test(newEmail);

  const requiredFields = { newEmail };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  if (!user) return null;

  return (
    <ProfileForm
      title="Update your email"
      submitLabel="Update"
      requiredFields={requiredFields}
      isValidated={isValidEmail}
      loading={loading}
      error={error}
      closeForm={close}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await privateRequest({
            method: "POST",
            url: "profile/change-email/mail-code",
            data: { newEmail },
          });
          openCodeVerificationForm();
        });
      }}
    >
      <p className="text-center">Enter your new email.</p>
      <InputField.Email
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        isValid={isValidEmail}
        placeholder="New Email"
        autoFocus
      />
    </ProfileForm>
  );
}

export default UpdateEmailForm;
