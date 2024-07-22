import { TaskType } from "@/types/task";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Task from "./components/Tasks";

const testTasks: TaskType[] = [
  { _id: "1", title: "Study React", completed: true },
  { _id: "2", title: "Study TypeScript", completed: false },
  { _id: "3", title: "Study Next.js", completed: false },
  { _id: "4", title: "Study Node.js", completed: true },
  { _id: "5", title: "Study Express.js", completed: false },
  { _id: "6", title: "Study MongoDB", completed: false },
];

function Tasks() {
  useDocumentTitle("Your Tasks");

  const tasks = testTasks;

  return (
    <div className="container flex animate-fade-in flex-col gap-6 px-4 py-14 sm:gap-8">
      <h2>Your have 6 tasks on your list</h2>
      <div className="bg-basic-2 rounded-primary flex flex-col overflow-hidden">
        {tasks && tasks.map((task: any) => <Task key={task._id} task={task} />)}
      </div>
    </div>
  );
}

export default Tasks;
