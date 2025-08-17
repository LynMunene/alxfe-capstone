import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 outline-none text-black"
      />
      <CiSearch className="text-gray-500 text-xl" />
    </div>
  );
}
