import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";

function Profile() {
  const { user } = useUser();
  const logout = useLogout();

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="flex-center container flex-col gap-8 px-4 py-10">
      <img src={user.imgUrl} alt={fullName} className="h-40 w-40 rounded-full" />
      <h1>{fullName}</h1>
      <p>{user.email}</p>
      <button className="btn-basic" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
