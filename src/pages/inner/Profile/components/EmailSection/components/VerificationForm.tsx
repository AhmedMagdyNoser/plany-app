import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { getUserFromAccessToken, handleFormSubmission } from "@/utils/helpers";
import { VerificationPurpose } from "@/types/verificationPurpose";
import useUser from "@/hooks/useUser";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import ProfileForm from "../../ProfileForm";

function VerificationForm({ purpose, closeForm }: { purpose: VerificationPurpose; closeForm: () => void }) {
  const { user, setUser } = useUser();

  const [code, setCode] = useState<string>("");

  const requiredFields = { code };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  if (!user) return null;

  return (
    <ProfileForm
      title="Verify your email"
      submitLabel="Verify"
      requiredFields={requiredFields}
      isValidated={code.length === 6}
      loading={loading}
      error={error}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          const at = await apiRequest({
            method: "POST",
            url: "auth/verify-verification-code",
            data: { email: user.email, purpose, code },
            credentials: "include",
          });
          switch (purpose) {
            case "Change Email":
              setUser(getUserFromAccessToken(at as string));
              break;
            case "Verify Email":
              setUser({ ...user, emailVerified: true });
              break;
          }
          closeForm();
        });
      }}
    >
      <p className="text-center">Enter verification code we sent to your email.</p>
      <InputField
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Verification Code"
        className="text-center text-base"
        maxLength={6}
        autoFocus
      />
    </ProfileForm>
  );
}

export default VerificationForm;
