import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskPopup = ({ isOpen, onClose, taskToEdit }) => {
  const { dispatch } = useTasks();

  // Initialize form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  // Re-initialize form fields when the popup opens with a task to edit
  const initializeForm = (task = null) => {
    setTitle(task ? task.title : "");
    setDescription(task ? task.description : "");
    setDate(task ? task.date : "");
    setCategory(task ? task.category : "");
  };

  // Ensure the form initializes correctly whenever the popup opens
  if (isOpen && taskToEdit && title === "") {
    initializeForm(taskToEdit); // Pre-fill form only when editing and the title is empty
  }

  const handleClose = () => {
    onClose();
    initializeForm(); // Reset form after closing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: All fields must be filled
    if (!title || !description || !date || !category) {
      toast.error("All fields are required!");
      return;
    }

    const taskData = {
      id: taskToEdit ? taskToEdit.id : Date.now(), // Use existing ID if editing
      title,
      description,
      date,
      category,
    };

    if (taskToEdit) {
      dispatch({ type: "EDIT_TASK", payload: taskData });
      toast.success("Task updated successfully!");
    } else {
      dispatch({ type: "ADD_TASK", payload: taskData });
      toast.success("Task added successfully!");
    }

    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="bg-gray-800 bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <div
        className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl z-10 absolute top-auto left-0 lg:left-1/3"
        onClick={handleClose} // Close popup when clicking outside
      >
        <div className="p-6" onClick={(e) => e.stopPropagation()}>
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            {taskToEdit ? "Edit Task" : "Create Task"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="taskName"
                required=""
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue={""}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                name="dueDate"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Category</option>
                <option value="To-Do">To-Do</option>
                <option value="On Progress">On Progress</option>
                <option value="Done">Done</option>
                <option value="Revised">Revised</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {taskToEdit ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default TaskPopup;
