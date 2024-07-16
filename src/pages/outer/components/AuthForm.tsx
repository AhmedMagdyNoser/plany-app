import { Link } from "react-router-dom";
import { hasCompleteData } from "@/utils/helpers";
import SVGIcon from "@/components/icons/SVGIcon";
import Alert from "@/components/ui/Alert";

type AuthFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  submitLabel: string;
  leave?: { to: string; label: string; hint: string };
  requiredFields?: Record<string, string>;
  error: string;
  loading: boolean;
  children: React.ReactNode;
};

function AuthForm({ onSubmit, title, submitLabel, leave, requiredFields, error, loading, children }: AuthFormProps) {
  return (
    <div className="animate-fade-in mx-auto w-[385px] max-w-full px-4 py-[75px]">
      <h1 className="mb-6 text-center">{title}</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
        <button
          type="submit"
          disabled={(requiredFields && !hasCompleteData(requiredFields)) || loading}
          className="btn-primary flex-center h-[39px] font-semibold uppercase"
        >
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
