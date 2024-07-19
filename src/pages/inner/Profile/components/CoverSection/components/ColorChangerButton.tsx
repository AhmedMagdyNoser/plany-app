import { colors, User } from "@/types/user";
import { logError } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import SVGIcon from "@/components/icons/SVGIcon";

function ColorChangerButton({ className }: { className?: string }) {
  const { user, setUser } = useUser();

  const privateRequest = usePrivateRequest();

  const { loading, setLoading } = useFetchingStatus();

  async function changeColor() {
    let newColor: colors;
    switch (user?.favColor) {
      case "red":
        newColor = "green";
        break;
      case "green":
        newColor = "blue";
        break;
      case "blue":
        newColor = "orange";
        break;
      case "orange":
        newColor = "fuchsia";
        break;
      case "fuchsia":
        newColor = "red";
        break;
      default:
        newColor = "red";
    }

    try {
      setLoading(true);
      await privateRequest({ method: "PATCH", url: "profile/change-color", data: { color: newColor } });
      setUser({ ...user, favColor: newColor } as User);
    } catch (error) {
      logError("changeColor", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={"btn-blank flex-center h-[30px] w-[30px] rounded-full p-0 " + className}
      onClick={changeColor}
      disabled={loading}
    >
      {loading ? <SVGIcon.Spinner size={18} /> : <SVGIcon.Colors size={18} />}
    </button>
  );
}

export default ColorChangerButton;
