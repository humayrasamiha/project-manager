import { useState } from "react";
import { TaskProvider } from "./components/context/TaskContext";
import TaskList from "./components/ProjectBoard/TaskList";
import TaskPopup from "./components/ProjectBoard/TaskPopup";
import AddTaskButton from "./components/ProjectBoard/AddTaskButton";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const openPopup = (task = null) => {
    setTaskToEdit(task);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTaskToEdit(null);
  };

  return (
    <TaskProvider>
      <div className="flex h-screen">
        <Sidebar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Header />
          <div className="mx-auto max-w-7xl p-6">
            <AddTaskButton onClick={() => openPopup()} />
            <div className="mx-auto max-w-7xl">
              <TaskPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                taskToEdit={taskToEdit}
              />
              <div className="-mx-2 mb-6 flex flex-wrap">
                <TaskList category="To-Do" onEdit={openPopup} />
                <TaskList category="On Progress" onEdit={openPopup} />
                <TaskList category="Done" onEdit={openPopup} />
                <TaskList category="Revised" onEdit={openPopup} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </TaskProvider>
  );
};

export default App;
