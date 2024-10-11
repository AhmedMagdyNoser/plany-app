import { Task as TaskType } from "@/types/task";
import solidIcons from "@/components/icons/solid";
import outlineIcons from "@/components/icons/outline";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useTasks from "@/hooks/useTasks";
import handleRequest from "@/utils/helpers";
import completedSound from "@/assets/sounds/completed.mp3";

function Task({ task }: { task: TaskType }) {
  const { setTasks } = useTasks();

  const privateRequest = usePrivateRequest();
  const { loading: deleting, setLoading: setDeleting, setError: setDeleteError } = useFetchingStatus();

  async function handleDelete() {
    handleRequest(setDeleting, setDeleteError, async () => {
      await privateRequest({ url: `tasks/${task._id}`, method: "DELETE" });
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
    });
  }

  async function handleComplete() {
    const updatedTask = await privateRequest({
      method: "PATCH",
      url: `tasks/${task._id}`,
      data: { completed: !task.completed },
    });
    setTasks((prevTasks) => prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    if (!task.completed) {
      const audio = new Audio(completedSound);
      audio.volume = 0.35;
      audio.play();
    }
  }

  return (
    <div className="rounded-primary bg-basic-3 flex w-full justify-between px-8 py-4 transition-colors">
      <div className="flex items-center gap-4">
        <button onClick={handleComplete} className="flex-center hover:bg-basic-2 rounded-primary h-10 w-10">
          {task.completed ? (
            <outlineIcons.CheckedCircle size={23.5} className="txt-green" />
          ) : (
            <outlineIcons.EmptyCircle size={21.5} className="txt-basic-h" />
          )}
        </button>
        <span className={`txt-basic-h font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</span>
      </div>

      <button onClick={handleDelete} className="hover:txt-red transition-colors" title="Delete this task">
        {deleting ? <solidIcons.Spinner size={16.5} className="animate-spin" /> : <outlineIcons.Trash size={18} />}
      </button>
    </div>
  );
}

export default Task;
