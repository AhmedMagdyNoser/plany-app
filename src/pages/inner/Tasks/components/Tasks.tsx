import outlineIcons from "@/components/icons/outline";
import solidIcons from "@/components/icons/solid";
import { Menu } from "@mantine/core";

function Task({ task }: { task: any }) {
  return (
    <div className="rounded-primary bg-basic-3 flex w-full justify-between px-8 py-4 transition-colors">
      <div className="flex items-center gap-4">
        <button className="flex-center hover:bg-basic-2 rounded-primary h-10 w-10">
          {task.completed ? (
            <outlineIcons.CheckedCircle size={23.5} className="txt-green" />
          ) : (
            <outlineIcons.EmptyCircle size={21.5} />
          )}
        </button>
        <span className={`txt-basic-h font-semibold ${task.completed ? "line-through" : ""}`}>{task.title}</span>
      </div>

      <Menu shadow="md" width={185} withArrow radius={7.5}>
        <Menu.Target>
          <button className="flex-center h-[30px] w-[30px] rounded-full p-0">
            <outlineIcons.KebabMenu size={15} />
          </button>
        </Menu.Target>

        <Menu.Dropdown className="bg-basic-">
          <Menu.Label>Options</Menu.Label>
          <Menu.Item px={15} py={10} leftSection={<solidIcons.Edit size={14} />}>
            Edit this task
          </Menu.Item>
          <Menu.Item px={15} py={10} color="red" leftSection={<outlineIcons.Trash size={14} />}>
            Delete this task
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default Task;
