import useDocumentTitle from "@/hooks/useDocumentTitle";
import useTasks from "@/hooks/useTasks";
import Task from "./components/Tasks";
import AddTask from "./components/add-task";
import LoadingSection from "@/components/ui/loading-section";
import ErrorSection from "@/components/ui/error-section";
import ballon from "@/assets/balloon.png";
import { Task as TaskType } from "@/types/task";

export default function Tasks() {
  useDocumentTitle("Your Tasks");

  const { tasks, loading, error, reLoad } = useTasks();

  return (
    <div className="container animate-fade-in px-4 py-8 sm:py-14">
      {loading ? (
        <LoadingSection className="h-80" message="Loading your tasks..." />
      ) : error ? (
        <ErrorSection
          className="h-80"
          errorTitle="Failed to load tasks"
          errorMessage={error}
          button={{
            text: "Try Again",
            onClick: reLoad,
          }}
        />
      ) : (
        <div className="flex animate-fade-in flex-col gap-6 sm:gap-8">
          {tasks.length === 0 ? (
            <section className="flex-center bg-basic-2 rounded-primary flex-col gap-2 px-4 py-12">
              <img src={ballon} alt="No tasks" className="h-20 w-20" />
              <p className="txt-basic-h font-bold">It seems you have no tasks on your list.</p>
              <p>Add a task to get started.</p>
            </section>
          ) : (
            <>
              <h2>Your have {tasks.length} tasks on your list</h2>
              <section className="flex flex-col gap-2">
                {tasks && tasks.map((task: TaskType) => <Task key={task._id} task={task} />)}
              </section>
            </>
          )}
          <AddTask />
        </div>
      )}
    </div>
  );
}
