import { X } from "lucide-react";
import { useEffect } from "react";

export function ConfirmationModal({
  showModal,
  setShowModal,
  title,
  text,
  onConfirmation,
}) {
  useEffect(() => {
    if (showModal) {
      document.getElementById("confirmation-modal")?.showModal();
    } else {
      document.getElementById("confirmation-modal")?.close();
    }
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmation();
  };

  return (
    <dialog id="confirmation-modal" className="modal">
      <div className="modal-box">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-ghost absolute right-2 top-2 text-slate-500 hover:text-slate-600"
          onClick={() => setShowModal(false)}
        >
          <X />
        </button>

        <h3 className="text-lg font-bold">{title}</h3>

        <p className="mb-4">{text}</p>
        <div className="flex w-full gap-4">
          <button
            className="btn btn-error flex-grow text-white"
            onClick={handleSubmit}
          >
            Delete
          </button>
          <button
            className="btn btn-outline flex-grow "
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShowModal(false)}>close</button>
      </form>
    </dialog>
  );
}
