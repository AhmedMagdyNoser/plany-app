import { useSelector } from 'react-redux';
import NewTask from "../Components/Tasks/NewTask";
import Task from "../Components/Tasks/Task";

export default function TasksPage() {

  const tasks = useSelector(store => store.tasks.data)

  return (
    <div className='container my-5'>
      <h3>لديك {tasks.length} مهام اليوم</h3>
      <TasksList tasks={tasks} />
      <NewTask />
    </div>
  )
}

function TasksList({ tasks }) {
  return (
    <div className='shadow-sm my-4 bg-white rounded'>
      {tasks.length ?
        tasks.map(task => <Task key={task.id} task={task} />)
        :
        <h3 className='text-center py-5'>ليس لديك مهام اليوم</h3>
      }
    </div>
  )
}