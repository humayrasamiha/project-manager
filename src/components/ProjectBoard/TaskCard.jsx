import DeleteSvg from "../SVG/DeleteSvg";
import EditSvg from "../SVG/EditSvg";
import cn from "classnames";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDate = (dateString) => {
  const date = new Date(dateString); // Create a date object from string
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const titleColor = {
    "To-Do": "text-indigo-600",
    "On Progress": "text-yellow-500",
    Done: "text-teal-500",
    Revised: "text-rose-500",
  };

  const confirmDelete = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this task?</p>
        <div className="flex justify-end space-x-4 mt-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => {
              onDelete(id);
              toast.dismiss(); // Close the toast
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 px-3 py-1 rounded"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="mb-4 rounded-lg bg-gray-800 p-4">
      <div className="flex justify-between">
        <h4
          className={cn(
            "mb-2 flex-1 font-semibold",
            titleColor[task.category] || "text-white"
          )}
        >
          {task.title}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => confirmDelete(task.id)}
            className="text-red-400 cursor-pointer"
          >
            <DeleteSvg />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-green-400 cursor-pointer"
          >
            <EditSvg />
          </button>
        </div>
      </div>
      <p className="mb-2 text-sm text-zinc-200">{task.description}</p>
      <p className="mt-6 text-xs text-zinc-400">{formatDate(task.date)}</p>
    </div>
  );
};

export default TaskCard;
