import SVGIcon from "@/components/icons/SVGIcon";
import Alert from "@/components/ui/Alert";
import { Link } from "react-router-dom";

type AuthFormProps = {
  title: string;
  submitLabel: string;
  leave?: { to: string; label: string; hint: string };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading: boolean;
  children: React.ReactNode;
};

function AuthForm({ title, submitLabel, leave, handleSubmit, error, loading, children }: AuthFormProps) {
  return (
    <div className="mx-auto w-[385px] max-w-full px-4 py-[100px]">
      <h1 className="mb-6 text-center">{title}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {children}
        <button type="submit" disabled={loading} className="btn-primary flex-center h-[39px] font-semibold uppercase">
          {loading ? <SVGIcon.Spinner size={20} /> : submitLabel}
        </button>
        {error && <Alert.Error message={error} />}
        {leave && (
          <p className="flex items-center justify-center gap-1">
            <span>{leave.hint}</span>
            <Link to={leave.to} className="link font-semibold">
              {leave.label}
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
