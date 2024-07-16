import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "@/utils/api";
import { appName, paths } from "@/utils/constants";
import { handleFormSubmission } from "@/utils/helpers";
import { validationRegex } from "@/utils/validation";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import AuthForm from "./components/AuthForm";

function ResetPassword() {
  useDocumentTitle(`Reset Your Password | ${appName}`);

  const location = useLocation();
  const navigate = useNavigate();

  const token = location.state?.token;

  // Accessing this page is not allowed if you didn't get a token using the Verify Code page
  if (!token) return <Navigate to={`/${paths.login}`} replace={true} />;

  const [newPassword, setNewPassword] = useState<string>("");

  const isValidPassword = validationRegex.password.test(newPassword);

  const requiredFields = { newPassword };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  const [success, setSuccess] = useState<boolean>(false);

  return success ? (
    <SuccessMessage />
  ) : (
    <AuthForm
      title="Hello again!"
      requiredFields={requiredFields}
      isValidated={isValidPassword}
      loading={loading}
      error={error}
      submitLabel="Reset"
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await apiRequest("auth/reset-password", {
            method: "PATCH",
            body: JSON.stringify({ token, newPassword }),
          });
          setSuccess(true); // Displays the success message
          setTimeout(() => navigate(`/${paths.login}`, { state: null }), 3500);
        });
      }}
    >
      <p className="text-center">Please choose your new password.</p>
      <InputField.Password
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        isValid={isValidPassword}
        placeholder="New Password"
        autoFocus
      />
    </AuthForm>
  );
}

export default ResetPassword;

function SuccessMessage() {
  return (
    <div className="animate-fade-in flex-center mx-auto w-[385px] max-w-full flex-col gap-5 px-4 py-[75px]">
      <span className="brdr-basic-3 flex-center h-28 w-28 rounded-full border text-3xl">♥</span>
      <h2 className="text-center">Password reset successfully</h2>
      <p className="text-center">Now you can login with your new password.</p>
    </div>
  );
}
