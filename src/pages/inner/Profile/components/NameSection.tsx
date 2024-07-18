import SVGIcon from "@/components/icons/SVGIcon";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";

function NameSection() {
  const { user } = useUser();
  const logout = useLogout();

  if (!user) return null;

  return (
    <section className="flex-center flex-col gap-2">
      <div className="relative">
        <h1 className="text-center tracking-tighter">{user.fullName}</h1>
        <button
          className="btn-primary-light absolute top-1/2 -translate-y-1/2 rounded-full p-[5px]"
          style={{ left: "calc(100% + 10px)" }}
        >
          <SVGIcon.Edit size={12} />
        </button>
      </div>
      <p className="text-center">Joined on {new Date(user.createdAt).toDateString()}</p>
      <button className="btn-basic mt-4" onClick={logout}>
        Logout
      </button>
    </section>
  );
}

export default NameSection;
