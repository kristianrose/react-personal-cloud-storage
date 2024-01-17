import { X } from "lucide-react";
import React from "react";

export default function TaskItem({
  id,
  title,
  completed,
  handleComplete,
  handleDelete,
}) {
  return (
    <div
      key={id}
      className="flex items-center justify-between border-b border-l-4 border-slate-200 border-l-transparent px-2 py-3 transition duration-150 ease-linear hover:from-slate-100"
    >
      <div className="form-control">
        <label
          className="label cursor-pointer"
          onClick={() => handleComplete(id, completed)}
        >
          <input
            readOnly
            type="checkbox"
            checked={completed}
            className="checkbox-primary checkbox"
          />
          <span
            className={
              "label-text ml-4 hover:text-slate-600" +
              (completed ? " line-through" : "")
            }
          >
            {title}
          </span>
        </label>
      </div>

      <X
        className="cursor-pointer text-slate-500 hover:text-slate-600"
        onClick={() => handleDelete(id)}
      />
    </div>
  );
}
