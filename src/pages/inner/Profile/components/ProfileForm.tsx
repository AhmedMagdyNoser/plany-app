import { hasCompleteData } from "@/utils/helpers";
import SVGIcon from "@/components/icons/SVGIcon";
import Alert from "@/components/ui/Alert";

type ProfileFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeForm: () => void;
  title?: string;
  submitLabel: string;
  submitClass?: string;
  requiredFields?: Record<string, string>;
  isValidated?: boolean;
  error: string;
  loading: boolean;
  children: React.ReactNode;
};

function ProfileForm({
  onSubmit,
  closeForm,
  title,
  submitLabel,
  submitClass = "btn-primary",
  requiredFields,
  isValidated,
  error,
  loading,
  children,
}: ProfileFormProps) {
  return (
    <form className="flex w-[315px] max-w-full animate-fade-in flex-col gap-3" onSubmit={onSubmit}>
      {title && <h2 className="text-center">{title}</h2>}
      {children}
      <div className="flex gap-2">
        <button type="button" className="btn-basic flex-1" onClick={closeForm}>
          Cancel
        </button>
        <button
          type="submit"
          className={`${submitClass} flex-center flex-1`}
          disabled={(requiredFields && !hasCompleteData(requiredFields)) || isValidated === false || loading}
        >
          {loading ? <SVGIcon.Spinner size={15} /> : submitLabel}
        </button>
      </div>
      {error && <Alert.Error message={error} />}
    </form>
  );
}

export default ProfileForm;
