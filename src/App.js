import Header from './Components/Header';
import Form from "./Components/Form";
import Task from "./Components/Task";
import { useRef, useState } from "react";
import { addTaskToStorage, getAllTasks, getNumberOfTasks, removeTaskFromStorage } from "./Storage";

export default function App() {

  let [tasks, setTasks] = useState(getAllTasks());
  let form = useRef(0);

  function deleteTask(id) {
    removeTaskFromStorage(id, setTasks)
  }

  function addTask(name, time) {
    addTaskToStorage({ id: Math.floor(Math.random() * 10 ** 9), name: name, time: time, checked: false }, setTasks)
  }

  function toggleForm() {
    if (form.current.style.display === 'block') {
      form.current.style.display = 'none';
    } else {
      form.current.style.display = 'block';
    }
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

        <button className='btn btn-primary px-5 mb-3' onClick={toggleForm}>اضف مهمة جديدة</button>

        <div style={{ display: 'none', transition: '250ms ease' }} ref={form}>
          <Form addTask={addTask} />
        </div>

      </div>
    </>
  )
}