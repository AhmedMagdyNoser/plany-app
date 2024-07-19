import { useState } from "react";
import { getCoverColor } from "@/utils/helpers";
import useUser from "@/hooks/useUser";
import DefaultProfileImg from "@/components/global/DefaultProfileImg";
import ColorChangerButton from "./components/ColorChangerButton";
import UploadImgButton from "./components/UploadImgButton";

const SIZE = 150; // px

function CoverSection() {
  const { user } = useUser();

  const [imgOptionsOpened, setImgOptionsOpened] = useState<boolean>(false);

  if (!user) return null;

  return (
    <section className="flex-center w-full flex-col gap-5">
      {/* Cover */}
      <div
        className="rounded-primary relative w-full transition-colors"
        style={{
          height: `${SIZE}px`,
          marginBottom: `${SIZE / 2}px`,
          backgroundImage: getCoverColor(user.favColor),
        }}
      >
        {/* Img */}
        <div
          style={{ height: `${SIZE}px`, width: `${SIZE}px` }}
          className="brdr-basic-1 absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-full border-4"
        >
          <div
            onClick={() => setImgOptionsOpened(!imgOptionsOpened)}
            className="flex-center absolute left-0 top-0 h-full w-full cursor-pointer bg-black opacity-0 transition-opacity hover:opacity-20"
          ></div>
          {user.imgUrl ? (
            <img src={user.imgUrl} alt={user.fullName} style={{ height: `${SIZE}px`, width: `${SIZE}px` }} />
          ) : (
            <DefaultProfileImg fontSize={3} />
          )}
        </div>
        {/* Change Color */}
        <ColorChangerButton className="absolute right-[10px] top-[10px]" />
      </div>
      {/* Image Options */}
      {imgOptionsOpened && (
        <div className="flex animate-fade-in gap-3">
          <UploadImgButton />
          {user.imgUrl && <button className="btn-red-light">Delete Picture</button>}
        </div>
      )}
    </section>
  );
}

export default CoverSection;
