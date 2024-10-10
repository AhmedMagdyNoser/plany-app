import { createContext, ReactNode, useEffect, useState } from "react";
import { Task, TasksContextProps } from "@/types/task";
import useFetchingStatus from "@/hooks/useFetchingStatus";
import usePrivateRequest from "@/hooks/usePrivateRequest";
import handleRequest from "@/utils/helpers";
import useUser from "@/hooks/useUser";

export const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  setTasks: () => {},
  loading: false,
  error: "",
  reLoad: () => {},
});

export default function TasksProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();

  const [tasks, setTasks] = useState<Task[]>([]);

  const { loading, setLoading, error, setError } = useFetchingStatus();

  const privateRequest = usePrivateRequest();

  async function getTasks() {
    handleRequest(setLoading, setError, async () => {
      const tasks = await privateRequest({ url: "tasks" });
      setTasks(tasks);
    });
  }

  useEffect(() => {
    if (user) getTasks();
  }, [user]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, loading, error, reLoad: getTasks }}>{children}</TasksContext.Provider>
  );
}
