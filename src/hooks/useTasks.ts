import { useContext } from "react";
import { TasksContextProps } from "@/types/task";
import { TasksContext } from "@/context/TasksContext";

function useTasks(): TasksContextProps {
  return useContext(TasksContext);
}

export default useTasks;
