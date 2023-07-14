import { useSelector } from "react-redux";
import Task from "../Components/Tasks/Task";
import AddTask from "../Components/Tasks/AddTask";
import { FadeIn } from "../Components/Utils/Fade";

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
    <div className="shadow-sm my-4 bg-white rounded">{tasks.length ? tasks.map((task) => <Task key={task.id} task={task} />) : <NoTasks />}</div>
  );
}

function NoTasks() {
  return (
    <FadeIn time="1s" className="flex-center text-muted flex-column gap-3 py-5">
      <i className="fa-solid fa-seedling" style={{ fontSize: "4.5rem" }}></i>
      <p>ليس لديك اى مهام</p>
    </FadeIn>
  );
}
