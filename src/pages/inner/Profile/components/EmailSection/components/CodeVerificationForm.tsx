import { useState } from "react";
import { getUserFromAccessToken, handleFormSubmission } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/input-field";
import { VerificationPurpose } from "../index";
import ProfileForm from "../../ProfileForm";

function CodeVerificationForm({ purpose, close }: { purpose: VerificationPurpose; close: () => void }) {
  const { user, setUser } = useUser();

  const privateRequest = usePrivateRequest();

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
          switch (purpose) {
            case "Change Email":
              const at = await privateRequest({
                method: "PATCH",
                url: "profile/change-email/verify-code",
                data: { code },
                credentials: "include",
              });
              setUser(getUserFromAccessToken(at as string));
              break;
            case "Verify Email":
              await privateRequest({
                method: "PATCH",
                url: "profile/verify-email/verify-code",
                data: { code },
              });
              setUser({ ...user, emailVerified: true });
              break;
          }
          close();
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

export default CodeVerificationForm;
