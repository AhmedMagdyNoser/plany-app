import useDocumentTitle from "@/hooks/useDocumentTitle";
import useTasks from "@/hooks/useTasks";
import Task from "./components/Tasks";
import AddTask from "./components/add-task";

function Tasks() {
  useDocumentTitle("Your Tasks");

  const { tasks } = useTasks();

  return (
    <div className="container flex animate-fade-in flex-col gap-6 px-4 py-14 sm:gap-8">
      <h2>Your have {tasks.length} tasks on your list</h2>
      <div className="flex flex-col gap-2">{tasks && tasks.map((task: any) => <Task key={task._id} task={task} />)}</div>
      <AddTask />
    </div>
  );
}

export default Tasks;
