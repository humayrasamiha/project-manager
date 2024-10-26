import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import cn from "classnames";

import SortSvg from "../SVG/SortSvg";
import TaskCard from "./TaskCard";

const TaskList = ({ category, onEdit }) => {
  const { tasks, dispatch, searchTerm } = useTasks();
  const [isDescending, setIsDescending] = useState(true);

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) // Search term fillter
    .filter((task) => task.category === category);

  // Task sorting function based on date
  const handleSort = () => {
    setIsDescending(!isDescending); // Toggle Ascending/Descending
  };

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    isDescending
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      <div
        className={cn(
          "rounded-lg p-4",
          getCategoryColor(category) || "text-white"
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {category} ({sortedTasks.length})
          </h3>

          <button onClick={handleSort}>
            <SortSvg />
          </button>
        </div>
        <div>
          {sortedTasks.length === 0 ? (
            <p className="text-left text-white">Task List is empty!</p>
          ) : (
            sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onEdit(task)}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  switch (category) {
    case "To-Do":
      return "bg-indigo-600";
    case "On Progress":
      return "bg-yellow-500";
    case "Done":
      return "bg-teal-500";
    case "Revised":
      return "bg-rose-500";
    default:
      return "#fff";
  }
};

export default TaskList;
