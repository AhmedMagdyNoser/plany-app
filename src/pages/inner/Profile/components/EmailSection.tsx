import useUser from "@/hooks/useUser";
import SVGIcon from "@/components/icons/SVGIcon";
import MiniUpdateButton from "./MiniUpdateButton";

function EmailSection() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <section className="flex-center flex-col gap-3 sm:gap-4">
      <div className="flex-center relative flex-wrap gap-2">
        <p className="text-center">{user.email}</p>
        <span>
          {user.emailVerified ? (
            <div className="txt-green flex gap-1">
              <SVGIcon.CheckedCircle size={15} />
              <span>Verified</span>
            </div>
          ) : (
            <div className="txt-red flex gap-1">
              <SVGIcon.XCircle size={15} />
              <span>Not verified</span>
            </div>
          )}
        </span>
        {user.emailVerified && <MiniUpdateButton onClick={() => console.log("Open Form")} />}
      </div>

      {!user.emailVerified && (
        <>
          <p>Secure your account by verifying your email.</p>
          <div className="flex-center gap-2">
            <button className="btn-basic">Change Email</button>
            <button className="btn-basic">Verify Email</button>
          </div>
        </>
      )}
    </section>
  );
}

export default EmailSection;
