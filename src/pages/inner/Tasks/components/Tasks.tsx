import SVGIcon from "@/components/icons/SVGIcon";

function Task({ task }: { task: any }) {
  return (
    <div className="rounded-primary bg-basic-3 flex w-full justify-between px-8 py-5 transition-colors">
      <div className="flex items-center gap-4">
        <button>
          {task.completed ? (
            <SVGIcon.CheckedCircle size={23.5} className="txt-green" />
          ) : (
            <SVGIcon.EmptyCircle size={23.5} />
          )}
        </button>
        <span className={`txt-basic-h font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</span>
      </div>
      <button className="btn-basic flex-center h-[30px] w-[30px] rounded-full p-0">
        <SVGIcon.Ellipsis size={15} />
      </button>
    </div>
  );
}

export default Task;
