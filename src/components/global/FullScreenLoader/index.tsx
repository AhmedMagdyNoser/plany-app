import SVGIcon from "@/components/icons/SVGIcon";

function FullScreenLoader({ message = "Just one second..." }) {
  return (
    <div className="flex-center h-screen flex-col gap-5">
      <SVGIcon.Spinner className="txt-primary" size={35} />
      <p className="txt-h text-xl">{message}</p>
    </div>
  );
}

export default FullScreenLoader;
