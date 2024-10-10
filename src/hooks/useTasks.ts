import { useContext } from "react";
import { TasksContextProps } from "@/types/task";
import { TasksContext } from "@/context/TasksContext";

export default function useTasks(): TasksContextProps {
  return useContext(TasksContext);
}
