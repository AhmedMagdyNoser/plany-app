// import { data } from "./data";
import { useRef, useState } from "react";
import Header from './Components/Header';
import Form from "./Components/Form";
import Task from "./Components/Task";
import { addTaskToStorage, getAllTasks, getNumberOfTasks, removeTaskFromStorage } from "./Storage";

export default function App() {

  let [tasks, setTasks] = useState(getAllTasks());
  let form = useRef(0);

  function deleteTask(id) {
    removeTaskFromStorage(id, setTasks)
  }

  function addTask(taskName, time) {
    addTaskToStorage({ id: Math.floor(Math.random() * 10 ** 9), taskName: taskName, time: time, checked: false }, setTasks)
  }

  function toggleForm() {
    if (form.current.style.opacity === '1') {
      form.current.style.opacity = '0';
      form.current.style.transform = 'translateY(25px)';
    } else {
      form.current.style.opacity = '1';
      form.current.style.transform = 'translateY(0)';
    }
  }

  return (
    <>
      <Header />

      <div className='container my-5' style={{ minHeight: '85vh' }}>

        <h3 onClick={() => console.log(getAllTasks())}>لديك {getNumberOfTasks()} مهام اليوم</h3>

        <div className='shadow-sm my-4 bg-white rounded'>
          {tasks.length ?
            tasks.map(task => <Task key={task.id} task={task} deleteTask={deleteTask} />)
            :
            <h3 className='text-center py-5'>ليس لديك مهام اليوم</h3>
          }
        </div>

        <button className='btn btn-primary px-5' onClick={toggleForm}>اضف مهمة جديدة</button>

        <div style={{ opacity: '0', transform: 'translateY(25px)', transition: '250ms ease' }} ref={form}>
          <Form addTask={addTask} />
        </div>

      </div>
    </>
  )
}