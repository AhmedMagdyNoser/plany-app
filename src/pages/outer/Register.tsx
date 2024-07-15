import { useState } from "react";
import { appName } from "@/utils/constants";
import { apiRequest } from "@/utils/api";
import { getUserFromAccessToken, remeberUser } from "@/utils/helpers";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import useUser from "@/hooks/useUser";
import InputField from "@/components/ui/InputField";
import AuthForm from "./components/AuthForm";
import handleFormSubmission from "./helpers/handleFormSubmission";

function Register() {
  useDocumentTitle(`Register | ${appName}`);

  const { setUser } = useUser();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const requiredFields = { firstName, lastName, email, password };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <AuthForm
      title="Create new account"
      submitLabel="Register"
      leave={{ to: "/login", label: "Login", hint: "Already have an account?" }}
      loading={loading}
      error={error}
      handleSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          const at = await apiRequest("auth/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ firstName, lastName, email, password }),
          });
          setUser(getUserFromAccessToken(at));
          remeberUser();
        });
      }}
    >
      <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
      <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
      <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
    </AuthForm>
  );
}

export default Register;
