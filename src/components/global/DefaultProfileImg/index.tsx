import useUser from "@/hooks/useUser";
import { getCoverColor } from "@/utils/helpers";

function DefaultProfileImg({ fontSize = 1 }: { fontSize?: number }) {
  const { user } = useUser();

  return (
    <div
      style={{ backgroundImage: getCoverColor("orange"), fontSize: `${fontSize}rem` }}
      className="flex-center h-full w-full rounded-full text-white"
    >
      {user ? user.firstName[0].toUpperCase() : "NA"}
    </div>
  );
}

export default DefaultProfileImg;
