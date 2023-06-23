import Header from "./Components/Global/Header";
import TasksPage from "./Pages/TasksPage";

export default function App() {
  return (
    <div style={{ minHeight: '101vh' }}>

      <Header />

      <TasksPage />
      
    </div>
  )
}