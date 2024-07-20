import { useState } from "react";
import { validationRegex } from "@/utils/validation";
import { handleFormSubmission } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import SVGIcon from "@/components/icons/SVGIcon";
import Alert from "@/components/ui/Alert";

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
    <form
      className="flex w-[250px] max-w-full animate-fade-in flex-col gap-3"
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await PrivateRequest({ method: "PATCH", url: "profile/change-name", data: { firstName, lastName } });
          setUser({ ...user, firstName, lastName, fullName: `${firstName} ${lastName}` });
          closeForm();
        });
      }}
    >
      <h2 className="text-center">Update your name</h2>
      <InputField.FirstName
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        isValid={isValidFirstName}
        autoFocus
      />
      <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} isValid={isValidLastName} />
      <div className="flex gap-2">
        <button type="button" className="btn-basic flex-1" onClick={closeForm}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex-1"
          disabled={loading || !(firstName && lastName && isValidFirstName && isValidLastName)}
        >
          {loading ? (
            <span className="flex gap-2">
              <SVGIcon.Spinner size={15} />
              <span>Updating...</span>
            </span>
          ) : (
            <span>Update</span>
          )}
        </button>
      </div>
      {error && <Alert.Error message={error} />}
    </form>
  );
}

export default UpdatingForm;
