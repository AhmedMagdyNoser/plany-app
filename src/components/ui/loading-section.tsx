import solidIcons from "@/components/icons/solid";

export default function LoadingSection({
  message = "Loading...",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={`flex-center rounded-primary bg-basic-2 animate-fade-in flex-col gap-4 p-10 ${className}`}>
      <div className="text-gray-600">{<solidIcons.Spinner size={20} />}</div>
      <p>{message}</p>
    </div>
  );
}
