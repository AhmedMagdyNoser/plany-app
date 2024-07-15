import SVGIcon from "@/components/icons/SVGIcon";
import useUser from "@/hooks/useUser";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <div className="flex-center container flex-col gap-6 py-32">
          <h2>Make your life easier</h2>
          <p>Using Plany you can manage your tasks and notes in one place</p>
          <div className="flex gap-4">
            <Link to="/tasks" className="btn-basic flex-center h-40 w-40 flex-col gap-4">
              <SVGIcon.CheckedCircle />
              Tasks
            </Link>
            <Link to="/notes" className="btn-basic flex-center h-40 w-40 flex-col gap-4">
              <SVGIcon.Pen />
              Notes
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex-center container flex-col gap-5 p-4 py-20">
          <h1>Welcome to Plany</h1>
          <p>A productivity app to manage your tasks and notes</p>
          <Link to="/register" className="btn-primary">
            Start for free
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
