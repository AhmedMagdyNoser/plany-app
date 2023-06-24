import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Global/Header";
import TasksPage from "./Pages/TasksPage";
import NotesPage from "./Pages/NotesPage";
import HomePage from "./Pages/HomePage";

export default function App() {
  return (
    <div style={{ minHeight: '101vh' }}>
      <HashRouter>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="notes" element={<NotesPage />} />
        </Routes>
      </HashRouter>

    </div>
  )
}