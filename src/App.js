import { data } from "./data";
import { useRef, useState } from "react";
import Header from './Components/Header';
import Form from "./Components/Form";
import Task from "./Components/Task";

export default function App() {

  let [tasks, setTasks] = useState(data);
  let form = useRef(0);

  function deleteTask(id) {
    setTasks(() => tasks.filter(task => task.id !== id));
  }

  function addTask(taskName, time) {
    if (tasks.length) {
      // create an id that is equal to (the last task is + 1)
      setTasks(values => [...values, { id: tasks[tasks.length - 1].id + 1, taskName: taskName, time: time }]);
    } else {
      setTasks([{ id: 0, taskName: taskName, time: time }]);
    }
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

        <h3>لديك {tasks.length} مهام اليوم</h3>

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