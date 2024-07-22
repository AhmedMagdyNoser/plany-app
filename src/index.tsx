import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import context providers
import ThemeProvider from "@/context/ThemeContext";
import UserProvider from "@/context/UserContext";
import TasksProvider from "@/context/TasksContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
