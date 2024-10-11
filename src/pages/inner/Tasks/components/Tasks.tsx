import { Task as TaskType } from "@/types/task";
import solidIcons from "@/components/icons/solid";
import outlineIcons from "@/components/icons/outline";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useTasks from "@/hooks/useTasks";
import handleRequest from "@/utils/helpers";

function Task({ task }: { task: TaskType }) {
  const { setTasks } = useTasks();

  const privateRequest = usePrivateRequest();
  const { loading, setLoading, setError } = useFetchingStatus();

  async function handleDelete() {
    handleRequest(setLoading, setError, async () => {
      await privateRequest({ url: `tasks/${task._id}`, method: "DELETE" });
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    });
  }

  return (
    <div className="rounded-primary bg-basic-3 flex w-full justify-between px-8 py-4 transition-colors">
      <div className="flex items-center gap-4">
        <button className="flex-center hover:bg-basic-2 rounded-primary h-10 w-10">
          {task.completed ? (
            <outlineIcons.CheckedCircle size={23.5} className="txt-green" />
          ) : (
            <outlineIcons.EmptyCircle size={21.5} className="txt-basic-h" />
          )}
        </button>
        <span className={`txt-basic-h font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</span>
      </div>

      <button onClick={handleDelete} className="hover:txt-red transition-colors" title="Delete this task">
        {loading ? <solidIcons.Spinner size={16.5} className="animate-spin" /> : <outlineIcons.Trash size={18} />}
      </button>
    </div>
  );
}

export default Task;
