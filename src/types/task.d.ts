export type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export interface TasksContextProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  loading: boolean;
  error: string;
  reLoad: () => void;
}
