import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "@/utils/api";
import { appName, paths } from "@/utils/constants";
import { handleFormSubmission } from "@/utils/helpers";
import { inputFieldsInstructions, validationRegex } from "@/utils/validation";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import InputField from "@/components/ui/InputField";
import solidIcons from "@/components/icons/solid";
import AuthForm from "./components/AuthForm";

function ResetPassword() {
  useDocumentTitle(`Reset Your Password | ${appName}`);

  const location = useLocation();
  const navigate = useNavigate();

  const token = location.state?.token;

  const [newPassword, setNewPassord] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const isValidNewPassword = validationRegex.password.test(newPassword);
  const isValidConfirmNewPassword = confirmNewPassword === newPassword;

  const requiredFields = { newPassword, confirmNewPassword };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  const [success, setSuccess] = useState<boolean>(false);

  // Accessing this page is not allowed if you didn't get a token using the Verify Code page
  if (!token) return <Navigate to={`/${paths.login}`} replace={true} />;

  return success ? (
    <SuccessMessage />
  ) : (
    <AuthForm
      title="Hello again!"
      requiredFields={requiredFields}
      isValidated={isValidNewPassword && isValidConfirmNewPassword}
      loading={loading}
      error={error}
      submitLabel="Reset"
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          await apiRequest({
            method: "PATCH",
            url: "auth/forgot-password/reset-password",
            data: { token, newPassword },
          });
          setSuccess(true); // Displays the success message
          setTimeout(() => navigate(`/${paths.login}`, { state: null }), 3500);
        });
      }}
    >
      <p className="text-center">Please choose your new password.</p>
      <InputField.Password
        value={newPassword}
        onChange={(e) => setNewPassord(e.target.value)}
        isValid={isValidNewPassword}
        placeholder="New Password"
        autoFocus
      />
      <InputField.Password
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        isValid={isValidConfirmNewPassword}
        instructions={inputFieldsInstructions.confirmPassword}
        placeholder="Confirm New Password"
      />
    </AuthForm>
  );
}

export default ResetPassword;

function SuccessMessage() {
  return (
    <div className="flex-center mx-auto w-[385px] max-w-full animate-fade-in flex-col gap-5 px-4 py-[75px]">
      <span className="brdr-basic-3 flex-center h-28 w-28 rounded-full border text-3xl">
        <solidIcons.CheckedCircle className="txt-green" />
      </span>
      <h2 className="text-center">Password reset successfully</h2>
      <p className="text-center">Now you can login with your new password.</p>
    </div>
  );
}
