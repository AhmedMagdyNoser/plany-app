import { User } from "@/types/user";
import { logError } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import SVGIcon from "@/components/icons/SVGIcon";

function DeleteImgButton() {
  const { user, setUser } = useUser();

  const privateRequest = usePrivateRequest();

  const { loading, setLoading } = useFetchingStatus();

  if (!user) return null;

  if (!user.imgUrl) return null;

  async function handleDeleteImg() {
    try {
      setLoading(true);
      await privateRequest({ method: "DELETE", url: "profile/delete-img" });
      setUser({ ...user, imgUrl: "" } as User);
    } catch (error) {
      logError("handleDeleteImg", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button className="btn-red-light" onClick={handleDeleteImg} disabled={loading}>
      {loading ? (
        <span className="flex gap-2">
          <SVGIcon.Spinner size={15} />
          <span>Deleting..</span>
        </span>
      ) : (
        "Delete Picture"
      )}
    </button>
  );
}

export default DeleteImgButton;
