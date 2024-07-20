import useUser from "@/hooks/useUser";

function DeletePromptButton({ openPrompt }: { openPrompt: () => void }) {
  const { user } = useUser();

  if (!user) return null;

  if (!user.imgUrl) return null;

  return (
    <button className="btn-red-light" onClick={openPrompt}>
      Delete Picture
    </button>
  );
}

export default DeletePromptButton;
