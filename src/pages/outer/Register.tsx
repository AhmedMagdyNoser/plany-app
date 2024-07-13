import InputField from "@/components/ui/InputField";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useUser from "@/hooks/useUser";
import { apiRequest } from "@/utils/api";
import { appName, globalErrorMessage } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function Register() {
  useDocumentTitle(`Register | ${appName}`);

  const { setUser } = useUser();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      try {
        setError("");
        setLoading(true);
        const res = await apiRequest("auth/register", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ firstName, lastName, email, password }),
        });
        setUser({ ...(jwtDecode(res) as any).user, accessToken: res });
      } catch (error) {
        setLoading(false);
        setError((error as string) || globalErrorMessage);
      }
    } else {
      // If the submit button is enabled with JS hacks
      setError("Please fill all the fields");
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" autoComplete="off">
        <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
        <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        <button type="submit" disabled={!firstName || !lastName || !email || !password || loading}>
          {loading ? "Loading..." : "Register"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Register;
