import InputField from "@/components/ui/InputField";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import useUser from "@/hooks/useUser";
import { apiRequest } from "@/utils/api";
import { appName } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import AuthForm from "./components/AuthForm";
import handleFormSubmission from "./helpers/handleFormSubmission";

function Register() {
  useDocumentTitle(`Register | ${appName}`);

  const { setUser } = useUser();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, setLoading, error, setError } = useFetchingStatus();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    handleFormSubmission(e, !!firstName && !!lastName && !!email && !!password, setLoading, setError, async () => {
      const res = await apiRequest("auth/register", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      setUser({ ...(jwtDecode(res) as any).user, accessToken: res });
      localStorage.setItem("remember", "true");
    });
  }

  return (
    <AuthForm
      title="Create new account"
      submitLabel="Register"
      leave={{ to: "/login", label: "Login", hint: "Already have an account?" }}
      handleSubmit={handleSubmit}
      error={error}
      loading={loading}
    >
      <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
      <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
      <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
    </AuthForm>
  );
}

export default Register;
