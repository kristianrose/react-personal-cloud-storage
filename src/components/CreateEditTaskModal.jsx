import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function CreateEditTaskModal({
  showModal,
  setShowModal,
  selectedTask,
  handleEdit,
  handleCreate,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.getElementById("create-edit-task-modal")?.showModal();
      console.log("selectedTask", selectedTask);
    } else {
      reset();
      document.getElementById("create-edit-task-modal")?.close();
    }
  }, [showModal]);

  useEffect(() => {
    if (selectedTask?.title) {
      setValue("title", selectedTask.title);
    }
  }, [selectedTask]);

  return (
    <dialog id="create-edit-task-modal" className="modal">
      <div className="modal-box">
        <form
          method="dialog"
          onSubmit={handleSubmit((data) =>
            selectedTask ? handleEdit(data, selectedTask) : handleCreate(data),
          )}
        >
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-ghost absolute right-2 top-2 text-slate-500 hover:text-slate-600"
            onClick={() => setShowModal(false)}
          >
            <X />
          </button>

          <h3 className="text-lg font-bold">
            {selectedTask ? "Edit" : "Create"} Task
          </h3>

          <div>
            <label className="label">
              <span className="label-text text-base">Title</span>
            </label>
            <input
              {...register("title", { required: "Title is required." })}
              type="text"
              placeholder="Enter Title"
              className={
                "input input-bordered w-full" +
                (showErrors && errors.title ? " input-error" : "")
              }
            />
            {showErrors && errors.title && (
              <p className="text-error">{errors.title.message}</p>
            )}
          </div>

          <button
            className="btn btn-primary btn-block mt-4"
            type="submit"
            onClick={() => setShowErrors(true)}
          >
            {selectedTask ? "Edit" : "Create"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShowModal(false)}>close</button>
      </form>
    </dialog>
  );
}
