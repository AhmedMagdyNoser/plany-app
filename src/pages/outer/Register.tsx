import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { appName, paths } from "@/utils/constants";
import { validationRegex } from "@/utils/validation";
import { handleFormSubmission, getUserFromAccessToken, remeberUser } from "@/utils/helpers";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import useUser from "@/hooks/useUser";
import InputField from "@/components/ui/input-field";
import AuthForm from "./components/AuthForm";

function Register() {
  useDocumentTitle(`Register | ${appName}`);

  const { setUser } = useUser();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const isValidFirstName = validationRegex.name.test(firstName);
  const isValidLastName = validationRegex.name.test(lastName);
  const isValidEmail = validationRegex.email.test(email);
  const isValidPassword = validationRegex.password.test(password);

  const requiredFields = { firstName, lastName, email, password };

  const { loading, setLoading, error, setError } = useFetchingStatus();

  return (
    <AuthForm
      title="Create new account"
      submitLabel="Register"
      leave={{ to: `/${paths.login}`, label: "Login", hint: "Already have an account?" }}
      requiredFields={requiredFields}
      isValidated={isValidFirstName && isValidLastName && isValidEmail && isValidPassword}
      loading={loading}
      error={error}
      onSubmit={(event) => {
        handleFormSubmission(event, requiredFields, setLoading, setError, async () => {
          const at = await apiRequest({
            method: "POST",
            url: "auth/register",
            data: { firstName, lastName, email, password },
            credentials: "include",
          });
          setUser(getUserFromAccessToken(at as string));
          remeberUser();
        });
      }}
    >
      <InputField.FirstName
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        isValid={isValidFirstName}
        autoFocus
      />
      <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} isValid={isValidLastName} />
      <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} isValid={isValidEmail} autoComplete="off" />
      <InputField.Password
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        isValid={isValidPassword}
        autoComplete="new-password"
      />
    </AuthForm>
  );
}

export default Register;
