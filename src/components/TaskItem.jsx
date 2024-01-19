import { Edit, X } from "lucide-react";

export default function TaskItem({
  task,
  handleComplete,
  handleDelete,
  openCreateEditTaskModal,
}) {
  return (
    task?.id && (
      <div
        key={task.id}
        className="flex items-center justify-between border-b border-l-4 border-slate-200 border-l-transparent px-2 py-3 transition duration-150 ease-linear hover:from-slate-100"
      >
        <div className="form-control flex flex-grow">
          <label
            className="label flex-grow cursor-pointer justify-start"
            onClick={() => handleComplete(task.id, task?.completed)}
          >
            <input
              readOnly
              type="checkbox"
              checked={task?.completed}
              className="checkbox-primary checkbox"
            />
            <span
              className={
                "label-text ml-4 hover:text-slate-600" +
                (task?.completed ? " line-through" : "")
              }
            >
              {task?.title}
            </span>
          </label>
        </div>

        <button
          className="btn-ghost mr-1 text-slate-500 hover:text-slate-600"
          onClick={() => openCreateEditTaskModal(task)}
        >
          <Edit />
        </button>
        <button
          className="btn-ghost text-slate-500 hover:text-slate-600"
          onClick={() => handleDelete(task.id)}
        >
          <X />
        </button>
      </div>
    )
  );
}
