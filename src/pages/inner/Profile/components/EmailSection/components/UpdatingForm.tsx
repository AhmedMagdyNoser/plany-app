import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { validationRegex } from "@/utils/validation";
import { handleFormSubmission } from "@/utils/helpers";
import { VerificationPurpose } from "@/types/verificationPurpose";
import useUser from "@/hooks/useUser";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import ProfileForm from "../../ProfileForm";

function UpdatingForm({
  closeForm,
  openVerificationForm,
}: {
  closeForm: () => void;
  openVerificationForm: (purpose: VerificationPurpose) => void;
}) {
  const { user } = useUser();

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
      closeForm={closeForm}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await apiRequest({
            method: "POST",
            url: "auth/send-verification-code",
            data: { email: user.email, purpose: "Change Email", newEmail },
          });
          openVerificationForm("Change Email");
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

export default UpdatingForm;
