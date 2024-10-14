import { useState } from "react";
import useTasks from "@/hooks/useTasks";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import handleRequest from "@/utils/helpers";
import solidIcons from "@/components/icons/solid";
import InputField from "@/components/ui/input-field";
import Alert from "@/components/ui/alert-g";

export default function AddTask() {
  const { setTasks } = useTasks();

  const [taskTitle, setTaskTitle] = useState("");

  const privateRequest = usePrivateRequest();
  const { loading, setLoading, error, setError } = useFetchingStatus();

  async function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!taskTitle) return;
    handleRequest(setLoading, setError, async () => {
      const newTask = await privateRequest({ url: "tasks", method: "POST", data: { title: taskTitle } });
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setTaskTitle("");
    });
  }

  return (
    <form onSubmit={addTask} className="flex flex-col gap-2">
      <div className="bg-basic-2 rounded-primary flex items-center">
        <solidIcons.Plus size={20} className="ml-5 mr-2" />
        <InputField
          type="text"
          placeholder="Add a task.."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border-0 py-5"
          autoFocus
        />
      </div>

      <button type="submit" className="btn-primary flex-center h-12 w-full font-bold" disabled={loading}>
        {loading ? <solidIcons.Spinner size={18} /> : "Add"}
      </button>

      {error && <Alert.Error message={error} />}
    </form>
  );
}
