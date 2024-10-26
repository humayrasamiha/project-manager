import { createContext, useReducer, useContext, useState } from "react";

const TaskContext = createContext();

const initialState = [];

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <TaskContext.Provider
      value={{ tasks: state, dispatch, searchTerm, setSearchTerm }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
