import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { appName, paths } from "@/utils/constants";
import { handleFormSubmission } from "@/utils/helpers";
import { apiRequest } from "@/utils/api";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import AuthForm from "./components/AuthForm";

function VerifyCode() {
  useDocumentTitle(`Verify Your Email | ${appName}`);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const purpose = location.state?.purpose;

  const [code, setCode] = useState<string>("");

  const requiredFields = { code };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  // Accessing this page is not allowed if you didn't provide your email using the Forgot Password page
  if (!email) return <Navigate to={`/${paths.login}`} replace={true} />;

  return (
    <AuthForm
      title="Check your email"
      leave={{ to: `/${paths.forgotPassword}`, label: "Back", hint: "" }}
      requiredFields={requiredFields}
      isValidated={code.length === 6}
      loading={loading}
      error={error}
      submitLabel="Verify"
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          const token = await apiRequest({
            method: "POST",
            url: "auth/verify-verification-code",
            data: { code, email, purpose },
          });
          navigate(`/${paths.resetPassword}`, { state: { token } });
        });
      }}
    >
      <p className="text-center">Enter verification code we sent to you.</p>
      <InputField
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Verification Code"
        className="text-center text-lg"
        maxLength={6}
        autoFocus
      />
    </AuthForm>
  );
}

export default VerifyCode;
