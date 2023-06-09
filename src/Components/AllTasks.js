import Task from "./Task";

export default function AllTasks({ tasks, setTasks }) {
  return (
    <div className='shadow-sm my-4 bg-white rounded'>
      {tasks.length ?
        tasks.map(task => <Task key={task.id} task={task} setTasks={setTasks} />)
        :
        <h3 className='text-center py-5'>ليس لديك مهام اليوم</h3>
      }
    </div>
  )
}