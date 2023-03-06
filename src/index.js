import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Task from './components/Task';
import Form from './components/Form';
import { data } from './data';
import './styles/fontawesome/all.min.css';
import './styles/master.css';

function App() {

  let [tasks, setTasks] = useState(data);

  function checkTasks() {
    if (tasks.length)
      return tasks.map(task => <Task key={task.id} id={task.id} taskName={task.taskName} time={task.time} deleteTask={deleteTask} />)
    else
      return <h3 className='text-center py-5'>ليس لديك مهام اليوم</h3>
  }

  function deleteTask(id) {
    setTasks(() => tasks.filter(t => t.id !== id));
  }

  function addTask(taskName, time) {
    if (tasks.length) {
      // create an id that is equal to (the last task is + 1)
      setTasks(values => [...values, {id: tasks[tasks.length-1].id + 1, taskName: taskName, time: time}]);
    } else {
      setTasks([{id: 0, taskName: taskName, time: time}]);
    }
  }

  return (
    <div className='container my-5' style={{minHeight: '85vh'}}>

      <h3>لديك {tasks.length} مهام اليوم</h3>

      <div className='shadow-sm my-4 bg-white rounded'>
        {checkTasks()}
      </div>

      <button className='btn btn-primary px-5' data-bs-toggle='collapse' data-bs-target='form'>اضف مهمة جديدة</button>

      <Form addTask={addTask} />

    </div>
  )
  
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <App />
  </>
);
