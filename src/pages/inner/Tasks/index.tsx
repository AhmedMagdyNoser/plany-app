import useDocumentTitle from "@/hooks/useDocumentTitle";
import useTasks from "@/hooks/useTasks";
import Task from "./components/Tasks";

function Tasks() {
  useDocumentTitle("Your Tasks");

  const { tasks } = useTasks();

  return (
    <div className="container flex animate-fade-in flex-col gap-6 px-4 py-14 sm:gap-8">
      <h2>Your have {tasks.length} tasks on your list</h2>
      <div className="bg-basic-2 rounded-primary flex flex-col overflow-hidden">
        {tasks && tasks.map((task: any) => <Task key={task._id} task={task} />)}
      </div>
    </div>
  );
}

export default Tasks;
