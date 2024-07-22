import useUser from "@/hooks/useUser";
import { colors } from "@/types/user";
import { getCoverColor } from "@/utils/helpers";

function DefaultProfileImg({ fontSize = 1 }: { fontSize?: number }) {
  const { user } = useUser();

  return (
    <div
      style={{ backgroundImage: getCoverColor(user?.favColor as colors), fontSize: `${fontSize}rem` }}
      className="flex-center h-full w-full rounded-full text-white transition-colors"
    >
      {user ? user.firstName[0].toUpperCase() : "NA"}
    </div>
  );
}

export default DefaultProfileImg;
