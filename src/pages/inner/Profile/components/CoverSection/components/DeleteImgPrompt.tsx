import { User } from "@/types/user";
import { logError } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import solidIcons from "@/components/icons/solid";

function DeleteImgPrompt({ closePrompt }: { closePrompt: () => void }) {
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
      closePrompt();
    } catch (error) {
      logError("handleDeleteImg", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex animate-fade-in flex-col gap-3">
      <p>Are you sure you want to delete your picture?</p>
      <div className="flex justify-center gap-2">
        <button className="btn-red" onClick={handleDeleteImg} disabled={loading}>
          {loading ? (
            <span className="flex gap-2">
              <solidIcons.Spinner size={15} />
              <span>Deleting..</span>
            </span>
          ) : (
            <span>Delete</span>
          )}
        </button>
        <button className="btn-basic" onClick={closePrompt}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteImgPrompt;
