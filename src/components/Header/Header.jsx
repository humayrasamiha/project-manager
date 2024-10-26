import Message from "../SVG/Message";
import NotificationSvg from "../SVG/NotificationSvg";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between bg-gray-800 p-4">
        <button className="lg:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <Searchbar/>
        <div className="flex items-center">
          <button className="relative mr-4">
            <NotificationSvg/>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button className="relative mr-4">
            <Message/>
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>
    </>
  );
}
