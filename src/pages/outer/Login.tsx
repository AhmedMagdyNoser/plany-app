import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { appName } from "@/utils/constants";
import { getUserFromAccessToken } from "@/utils/helpers";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import useUser from "@/hooks/useUser";
import InputField from "@/components/ui/InputField";
import Checkbox from "@/components/ui/Checkbox";
import AuthForm from "./components/AuthForm";
import handleFormSubmission from "./helpers/handleFormSubmission";

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
      leave={{ to: "/register", label: "Register", hint: "Don't have an account?" }}
      loading={loading}
      error={error}
      handleSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          const at = await apiRequest("auth/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });
          setUser(getUserFromAccessToken(at));
          remember && localStorage.setItem("remember", "true");
        });
      }}
    >
      <InputField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="off"
        autoFocus
      />
      <InputField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="new-password"
      />
      <Checkbox label="Remember me" checked={remember} onClick={() => setRemember(!remember)} />
    </AuthForm>
  );
}

export default Login;
