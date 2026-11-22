import { useState } from "react";
import { ChevronDown, Plus, RotateCcw } from "lucide-react";
import SearchBar from "./SearchBar.jsx";
import FilterTabs from "./FilterTabs.jsx";
import TaskCard from "./TaskCard.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { PRIORITIES } from "../data/sampleTasks.js";

export default function TaskList({ tasks, totalCount, onToggle, onNewTask, onEdit, onDelete }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [pendingDelete, setPendingDelete] = useState(null); // task awaiting confirmation

  const q = query.trim().toLowerCase();
  const filtersActive = Boolean(q) || status !== "All" || priority !== "All";

  // search (title, case-insensitive, partial) + status + priority all apply to the same list
  const visible = tasks.filter(
    (t) =>
      (status === "All" || t.status === status) &&
      (priority === "All" || t.priority === priority) &&
      (!q || t.title.toLowerCase().includes(q))
  );

  const reset = () => {
    setQuery("");
    setStatus("All");
    setPriority("All");
  };

  const askDelete = (id) => setPendingDelete(tasks.find((t) => t.id === id) ?? null);
  const confirmDelete = () => {
    onDelete(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="tasks">
      <div className="tasks-head">
        <div>
          <h2>My tasks</h2>
          <p className="subtitle">
            <span className="desktop-copy">Manage and track everything in one place.</span>
            <span className="mobile-copy">Your priorities for this week</span>
          </p>
        </div>
        <button type="button" className="btn btn-soft view-all" onClick={reset}>View all tasks</button>
        <button type="button" className="btn btn-primary icon-btn" aria-label="Add task" onClick={onNewTask}>
          <Plus size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="toolbar">
        <FilterTabs value={status} onChange={setStatus} totalCount={totalCount} />
        <SearchBar value={query} onChange={setQuery} />
        <label className="select">
          <span>Priority:</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} aria-label="Filter by priority">
            <option value="All">All</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <ChevronDown size={14} aria-hidden="true" />
        </label>
        {filtersActive && (
          <button type="button" className="reset" onClick={reset}>
            <RotateCcw size={12} aria-hidden="true" /> Reset filters
          </button>
        )}
      </div>

      {visible.length ? (
        <ul className="task-list">
          {visible.map((t) => (
            <TaskCard key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={askDelete} />
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>{tasks.length ? "No tasks match these filters." : "No tasks yet. Add one to get started."}</p>
          {tasks.length > 0 && filtersActive && (
            <button type="button" className="btn btn-soft" onClick={reset}>Reset filters</button>
          )}
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={`“${pendingDelete.title}” will be removed from your board. This can't be undone.`}
          confirmLabel="Delete task"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}