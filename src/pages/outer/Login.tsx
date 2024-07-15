import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "@/utils/api";
import { appName } from "@/utils/constants";
import useUser from "@/hooks/useUser";
import useDocumentTitle from "@/hooks/useDocumentTitle";
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

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmission(e, !!email && !!password, setLoading, setError, async () => {
      const res = await apiRequest("auth/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      setUser({ ...(jwtDecode(res) as any).user, accessToken: res });
      remember && localStorage.setItem("remember", "true");
    });
  }

  return (
    <AuthForm
      title="Welcome back!"
      submitLabel="Login"
      leave={{ to: "/register", label: "Register", hint: "Don't have an account?" }}
      handleSubmit={handleSubmit}
      error={error}
      loading={loading}
    >
      <InputField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="off"
        autoFocus
      />
      <InputField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        autoComplete="new-password"
      />
      <Checkbox label="Remember me" checked={remember} onClick={() => setRemember(!remember)} />
    </AuthForm>
  );
}

export default Login;
