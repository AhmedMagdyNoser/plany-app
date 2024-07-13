import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { apiRequest } from "@/utils/api";
import { appName, globalErrorMessage } from "@/utils/constants";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useUser from "@/hooks/useUser";
import InputField from "@/components/ui/InputField";

function Login() {
  useDocumentTitle(`Login | ${appName}`);

  const { setUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) {
      try {
        setError("");
        setLoading(true);
        const res = await apiRequest("auth/login", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });
        setUser({ ...(jwtDecode(res) as any).user, accessToken: res });
        remember && localStorage.setItem("remember", "true");
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" autoComplete="false">
        <input className="hidden" autoComplete="false" />
        <InputField value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="off" />
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          autoComplete="new-password"
        />
        <label>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          Remember me
        </label>
        <button type="submit" disabled={!email || !password || loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
