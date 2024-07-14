import SVGIcon from "@/components/icons/SVGIcon";
import Alert from "@/components/ui/Alert";
import InputField from "@/components/ui/InputField";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useUser from "@/hooks/useUser";
import { apiRequest } from "@/utils/api";
import { appName, globalErrorMessage } from "@/utils/constants";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        localStorage.setItem("remember", "true");
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
    <div className="mx-auto mb-[100px] flex w-[385px] max-w-full flex-1 flex-col justify-center gap-6 p-4">
      <h1 className="text-center">Create new account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="false">
        <InputField.FirstName value={firstName} onChange={(e) => setFirstName(e.target.value)} autoFocus />
        <InputField.LastName value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <InputField.Email value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
        <InputField.Password value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        {error && <Alert.Error message={error} />}
        <button
          type="submit"
          disabled={!firstName || !lastName || !email || !password || loading}
          className="btn-a flex-center h-[39px] font-semibold uppercase"
        >
          {loading ? <SVGIcon.Spinner size={20} /> : "Register"}
        </button>
        <p className="flex items-center justify-center gap-1">
          Already have an account?
          <Link to="/login" className="link font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
