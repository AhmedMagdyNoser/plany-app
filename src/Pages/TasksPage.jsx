import { useSelector } from "react-redux";
import Task from "../Components/Tasks/Task";
import AddTask from "../Components/Tasks/AddTask";

export default function TasksPage() {
  const tasks = useSelector((store) => store.tasks.data);

  return (
    <div className="container my-5">
      <h3>لديك {tasks.length} من المهام فى قائمتك</h3>
      <TasksList tasks={tasks} />
      <AddTask />
    </div>
  );
}

function TasksList({ tasks }) {
  return (
    <div className="shadow-sm my-4 bg-white rounded">
      {tasks.length ? tasks.map((task) => <Task key={task.id} task={task} />) : <h3 className="text-center py-5">ليس لديك اى مهام</h3>}
    </div>
  );
}
