import { useState } from "react";
import { inputFieldsInstructions, validationRegex } from "@/utils/validation";
import { handleFormSubmission } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/input-field";
import ProfileForm from "../../ProfileForm";

function UpdatingForm({ closeForm, success }: { closeForm: () => void; success: () => void }) {
  const { user } = useUser();

  const PrivateRequest = usePrivateRequest();

  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassord] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const isValidNewPassword = validationRegex.password.test(newPassword);
  const isValidConfirmNewPassword = confirmNewPassword === newPassword;

  const requiredFields = { password, newPassword, confirmNewPassword };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  if (!user) return null;

  return (
    <ProfileForm
      title="Update your password"
      submitLabel="Update"
      requiredFields={requiredFields}
      isValidated={isValidNewPassword && isValidConfirmNewPassword}
      loading={loading}
      error={error}
      closeForm={closeForm}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await PrivateRequest({ method: "PATCH", url: "profile/change-password", data: { password, newPassword } });
          closeForm();
          success();
        });
      }}
    >
      <InputField.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Current Password"
        autoFocus
      />
      <InputField.Password
        value={newPassword}
        onChange={(e) => setNewPassord(e.target.value)}
        isValid={isValidNewPassword}
        placeholder="New Password"
      />
      <InputField.Password
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        isValid={isValidConfirmNewPassword}
        instructions={inputFieldsInstructions.confirmPassword}
        placeholder="Confirm New Password"
      />
    </ProfileForm>
  );
}

export default UpdatingForm;
