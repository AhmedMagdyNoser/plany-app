import { useRef } from "react";
import { User } from "@/types/user";
import { logError } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import SVGIcon from "@/components/icons/SVGIcon";

function UploadImgButton() {
  const { user, setUser } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const privateRequest = usePrivateRequest();

  const { loading, setLoading } = useFetchingStatus();

  if (!user) return null;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setLoading(true);
      const formData = new FormData();
      formData.append("img", file);
      const data = await privateRequest({ url: "profile/upload-img", method: "PATCH", data: formData });
      setUser({ ...user, imgUrl: data.imgUrl } as User);
    } catch (error) {
      logError("Uploading Image:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} hidden />
      <button className="btn-basic" onClick={() => fileInputRef.current?.click()} disabled={loading}>
        {loading ? (
          <span className="flex gap-2">
            <SVGIcon.Spinner size={15} />
            <span>Uploading..</span>
          </span>
        ) : (
          (user.imgUrl ? "Change" : "Upload") + " Picture"
        )}
      </button>
    </>
  );
}

export default UploadImgButton;
