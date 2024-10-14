import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { appName, paths } from "@/utils/constants";
import { handleFormSubmission, getUserFromAccessToken, remeberUser } from "@/utils/helpers";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import useUser from "@/hooks/useUser";
import InputField from "@/components/ui/input-field";
import Checkbox from "@/components/ui/checkbox-g";
import AuthForm from "./components/AuthForm";
import { Link } from "react-router-dom";

function Login() {
  useDocumentTitle(`Login | ${appName}`);

  const { setUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);

  const requiredFields = { email, password };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <AuthForm
      title="Welcome back!"
      submitLabel="Login"
      leave={{ to: `/${paths.register}`, label: "Register", hint: "Don't have an account?" }}
      requiredFields={requiredFields}
      loading={loading}
      error={error}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          const at = await apiRequest({
            method: "POST",
            url: "auth/login",
            data: { email, password },
            credentials: "include",
          });
          setUser(getUserFromAccessToken(at as string));
          remember && remeberUser();
        });
      }}
    >
      <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" autoFocus />
      <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" checked={remember} onClick={() => setRemember(!remember)} />
        <Link to={`/${paths.forgotPassword}`} className="link">
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
}

export default Login;
