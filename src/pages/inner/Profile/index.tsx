import DeleteSection from "./components/DeleteSection";
import Divider from "./components/Divider";
import EmailSection from "./components/EmailSection";
import ImgSection from "./components/ImgSection";
import NameSection from "./components/NameSection";
import PasswordSection from "./components/PasswordSection";

function Profile() {
  return (
    <div className="flex-center container animate-fade-in flex-col gap-6 sm:gap-8 p-4">
      <ImgSection />
      <NameSection />
      <Divider />
      <EmailSection />
      <Divider />
      <PasswordSection />
      <Divider />
      <DeleteSection />
    </div>
  );
}

export default Profile;
