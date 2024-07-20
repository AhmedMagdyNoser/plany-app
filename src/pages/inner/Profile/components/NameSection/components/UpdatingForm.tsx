import { useState } from "react";
import { validationRegex } from "@/utils/validation";
import { handleFormSubmission } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import ProfileForm from "../../ProfileForm";

function UpdatingForm({ closeForm }: { closeForm: () => void }) {
  const { user, setUser } = useUser();

  const PrivateRequest = usePrivateRequest();

  const [firstName, setFirstName] = useState(user?.firstName as string);
  const [lastName, setLastName] = useState(user?.lastName as string);

  const isValidFirstName = validationRegex.name.test(firstName);
  const isValidLastName = validationRegex.name.test(lastName);

  const requiredFields = { firstName, lastName };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  if (!user) return null;

  return (
    <ProfileForm
      title="Update your name"
      submitLabel="Update"
      requiredFields={requiredFields}
      isValidated={isValidFirstName && isValidLastName}
      loading={loading}
      error={error}
      closeForm={closeForm}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await PrivateRequest({ method: "PATCH", url: "profile/change-name", data: { firstName, lastName } });
          setUser({ ...user, firstName, lastName, fullName: `${firstName} ${lastName}` });
          closeForm();
        });
      }}
    >
      <InputField.FirstName
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        isValid={isValidFirstName}
        autoFocus
      />
      <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} isValid={isValidLastName} />
    </ProfileForm>
  );
}

export default UpdatingForm;
