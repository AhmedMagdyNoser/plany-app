export type TaskType = {
  _id: string;
  title: string;
  completed: boolean;
};

export interface TasksContextProps {
  tasks: TaskType[] | null;
  setTasks: (tasks: TaskType[]) => void;
}
