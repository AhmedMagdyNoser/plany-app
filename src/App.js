import { useState } from "react";
import Form from "./Components/Form";
import Header from './Components/Header';
import AllTasks from './Components/AllTasks';
import { getAllTasks, getNumberOfTasks } from "./Storage";

export default function App() {

  let [tasks, setTasks] = useState(getAllTasks());

  return (
    <div style={{ minHeight: '101vh' }}>

      <Header />

      <div className='container my-5'>

        <h3>لديك {getNumberOfTasks()} مهام اليوم</h3>

        <AllTasks tasks={tasks} setTasks={setTasks} />

        <Form setTasks={setTasks} />

      </div>
      
    </div>
  )
}