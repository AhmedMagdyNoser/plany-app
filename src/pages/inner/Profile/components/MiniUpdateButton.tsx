import solidIcons from "@/components/icons/solid";

function MiniUpdateButton({ className = "", onClick }: { className?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`btn-primary-light absolute top-1/2 -translate-y-1/2 rounded-full p-[6.5px] ${className}`}
      style={{ left: "calc(100% + 10px)" }}
    >
      <solidIcons.Pen size={10.75} />
    </button>
  );
}

export default MiniUpdateButton;
