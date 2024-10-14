import solidIcons from "@/components/icons/solid";

function FullScreenLoader({ message = "Just one second..." }) {
  return (
    <div className="flex-center h-screen flex-col gap-5">
      <solidIcons.Spinner className="txt-primary" size={30} />
      <p className="txt-h text-xl">{message}</p>
    </div>
  );
}

export default FullScreenLoader;
