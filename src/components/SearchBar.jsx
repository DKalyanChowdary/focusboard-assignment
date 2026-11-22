import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <label className="search">
      <Search size={14} aria-hidden="true" />
      <span className="sr-only">Search tasks</span>
      <input
        type="search"
        placeholder="Find a task..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}