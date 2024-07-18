import useUser from "@/hooks/useUser";

function DefaultProfileImg({ fontSize = 1 }: { fontSize?: number }) {
  const { user } = useUser();

  return (
    <div
      style={{ backgroundImage: "radial-gradient(circle, #60a5fa, #3b82f6)", fontSize: `${fontSize}rem` }}
      className="flex-center h-full w-full rounded-full text-white"
    >
      {user ? user.firstName[0].toUpperCase() : "NA"}
    </div>
  );
}

export default DefaultProfileImg;
