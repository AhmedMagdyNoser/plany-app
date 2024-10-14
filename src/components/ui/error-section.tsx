import solidIcons from "@/components/icons/solid";

type Props = {
  errorTitle: string;
  errorMessage: string;
  button?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
};

export default function ErrorSection({ errorTitle, errorMessage, button, className = "" }: Props) {
  return (
    <div className={`flex-center rounded-primary bg-basic-2 animate-fade-in flex-col gap-4 p-10 ${className}`}>
      <solidIcons.ExclamationCircle size={23.5} />
      <div className="flex-center flex-col gap-2">
        <span className="max-w-[500px] text-center font-bold">{errorTitle}</span>
        <span className="max-w-[500px] text-center">{errorMessage}</span>
      </div>
      {button && (
        <button onClick={button.onClick} className="btn-basic">
          {button.text}
        </button>
      )}
    </div>
  );
}
