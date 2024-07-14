import SVGIcon from "@/components/icons/SVGIcon";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

function Checkbox({ label, checked, onClick }: CheckboxProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "Spacebar" || e.key === "Enter") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown} className="flex cursor-pointer items-center gap-1">
      {checked ? (
        <SVGIcon.CheckedSquare size={18} className="text-primary" />
      ) : (
        <SVGIcon.EmptySquare size={18} className="text-primary" />
      )}
      <p>{label}</p>
    </div>
  );
}

export default Checkbox;
