import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const SearchBar = () => {
  const { setSearchTerm } = useTasks();
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    setInput(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mx-4 flex-1">
      <input
        type="text"
        value={input}
        onChange={handleSearch}
        placeholder="Search here"
        className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none"
      />
    </div>
  );
};
export default SearchBar;
