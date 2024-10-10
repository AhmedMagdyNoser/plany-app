export type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export interface TasksContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  loading: boolean;
  error: string;
  reLoad: () => void;
}
