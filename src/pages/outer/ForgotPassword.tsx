import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/utils/api";
import { appName, paths } from "@/utils/constants";
import { handleFormSubmission } from "@/utils/helpers";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/input-field";
import AuthForm from "./components/AuthForm";
import { validationRegex } from "@/utils/validation";

function ForgotPassword() {
  useDocumentTitle(`Forgot Password? | ${appName}`);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");

  const isValidEmail = validationRegex.email.test(email);

  const requiredFields = { email };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <AuthForm
      title="Forgot Password?"
      submitLabel="Continue"
      leave={{ to: `/${paths.login}`, label: "Back to Login", hint: "" }}
      requiredFields={requiredFields}
      isValidated={isValidEmail}
      loading={loading}
      error={error}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await apiRequest({
            method: "POST",
            url: "auth/forgot-password/mail-code",
            data: { email },
          });
          navigate(`/${paths.verifyCode}`, { state: { email } });
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
