import { useState } from "react";
import CoverSection from "./components/CoverSection";
import NameSection from "./components/NameSection";
import EmailSection from "./components/EmailSection";
import PasswordSection from "./components/PasswordSection";
import DeleteSection from "./components/DeleteSection";
import Divider from "./components/Divider";

function Profile() {
  const [moreOptionsOpened, setMoreOptionsOpened] = useState<boolean>(false);

  return (
    <div className="flex-center container animate-fade-in flex-col gap-6 p-4 pb-8 sm:gap-8">
      <CoverSection />
      <NameSection />
      <Divider />
      <EmailSection />
      <Divider />
      <PasswordSection />
      <Divider />
      <button className="hover:underline" onClick={() => setMoreOptionsOpened(!moreOptionsOpened)}>
        More Options
      </button>
      {moreOptionsOpened && <DeleteSection />}
    </div>
  );
}

export default Profile;
