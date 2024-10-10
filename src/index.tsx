import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "./index.css";

// Import context providers
import { MantineProvider } from "@mantine/core";
import ThemeProvider from "@/context/ThemeContext";
import UserProvider from "@/context/UserContext";
import TasksProvider from "@/context/TasksContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <ThemeProvider>
        <UserProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </UserProvider>
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>,
);
