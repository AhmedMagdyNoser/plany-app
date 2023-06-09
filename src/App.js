import Header from './Components/Header';
import Form from "./Components/Form";
import Task from "./Components/Task";
import { useState } from "react";
import { getAllTasks, getNumberOfTasks, removeTaskFromStorage } from "./Storage";

export default function App() {

  let [tasks, setTasks] = useState(getAllTasks());

  function deleteTask(id) {
    removeTaskFromStorage(id, setTasks)
  }

  return (
    <>
      <Header />

      <div className='container my-5' style={{ minHeight: '85vh' }}>

        <h3>لديك {getNumberOfTasks()} مهام اليوم</h3>

        <div className='shadow-sm my-4 bg-white rounded'>
          {tasks.length ?
            tasks.map(task => <Task key={task.id} task={task} deleteTask={deleteTask} />)
            :
            <h3 className='text-center py-5'>ليس لديك مهام اليوم</h3>
          }
        </div>

        <Form setTasks={setTasks} />

      </div>
    </>
  )
}