import { useState } from "react";
import { forgetUser, handleFormSubmission } from "@/utils/helpers";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useUser from "@/hooks/useUser";
import ProfileForm from "../../ProfileForm";
import InputField from "@/components/ui/input-field";

function DeletingForm({ cancel }: { cancel: () => void }) {
  const { setUser } = useUser();

  const PrivateRequest = usePrivateRequest();

  const [password, setPassword] = useState<string>("");
  const [confirmation, setConfirmation] = useState<string>("");

  const requiredFields = { password, confirmation };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <ProfileForm
      title="Delete your account"
      submitLabel="Delete"
      submitClass="btn-red"
      requiredFields={requiredFields}
      isValidated={/^delete my account$/i.test(confirmation)}
      loading={loading}
      error={error}
      closeForm={cancel}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await PrivateRequest({ method: "DELETE", url: "profile/delete-account", data: { password } });
          setUser(null);
          forgetUser();
        });
      }}
    >
      <p className="text-center">Please provide the following information.</p>
      <InputField.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your Password"
        autoFocus
      />
      <InputField
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        placeholder="Type 'delete my account'"
      />
    </ProfileForm>
  );
}

export default DeletingForm;
