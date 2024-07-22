import { createContext, ReactNode, useState } from "react";
import { TaskType, TasksContextProps } from "@/types/task";

export const TasksContext = createContext<TasksContextProps>({ tasks: null, setTasks: () => {} });

const testTasks: TaskType[] = [
  { _id: "1", title: "Study React", completed: true },
  { _id: "2", title: "Study TypeScript", completed: false },
  { _id: "3", title: "Study Next.js", completed: false },
  { _id: "4", title: "Study Node.js", completed: true },
  { _id: "5", title: "Study Express.js", completed: false },
  { _id: "6", title: "Study MongoDB", completed: false },
];

function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[] | null>(testTasks);

  return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>;
}

export default TasksProvider;
