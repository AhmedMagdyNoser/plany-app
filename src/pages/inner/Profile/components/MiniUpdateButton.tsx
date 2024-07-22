import SVGIcon from "@/components/icons/SVGIcon";

function MiniUpdateButton({ className = "", onClick }: { className?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`btn-primary-light absolute top-1/2 -translate-y-1/2 rounded-full p-[5px] ${className}`}
      style={{ left: "calc(100% + 10px)" }}
    >
      <SVGIcon.Edit size={12} />
    </button>
  );
}

export default MiniUpdateButton;
