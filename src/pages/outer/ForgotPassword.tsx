import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/utils/api";
import { appName, paths } from "@/utils/constants";
import { handleFormSubmission } from "@/utils/helpers";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import AuthForm from "./components/AuthForm";

const purpose = "Reset Password";

function ForgotPassword() {
  useDocumentTitle(`Forgot Password? | ${appName}`);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const requiredFields = { email };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <AuthForm
      title="Forgot Password?"
      submitLabel="Continue"
      leave={{ to: `/${paths.login}`, label: "Back to Login", hint: "" }}
      requiredFields={requiredFields}
      loading={loading}
      error={error}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await apiRequest("auth/send-verification-code", { method: "POST", body: JSON.stringify({ email, purpose }) });
          navigate(`/${paths.verifyCode}`, { state: { email, purpose } });
        });
      }}
    >
      <p className="text-center">Please enter your email address below.</p>
      <InputField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="off"
        autoFocus
      />
    </AuthForm>
  );
}

export default ForgotPassword;
