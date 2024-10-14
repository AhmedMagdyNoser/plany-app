import solidIcons from "@/components/icons/solid";
import outlineIcons from "@/components/icons/outline";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

export default function Checkbox({ label, checked, onClick }: CheckboxProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown} className="flex cursor-pointer items-center gap-1">
      {checked ? (
        <solidIcons.CheckedSquare size={15} className="txt-primary" />
      ) : (
        <outlineIcons.EmptySquare size={15} className="txt-primary" />
      )}
      <p>{label}</p>
    </div>
  );
}
