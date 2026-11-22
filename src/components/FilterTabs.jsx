export const TABS = [
  { id: "All", label: "All tasks" },
  { id: "To do", label: "To do" },
  { id: "In progress", label: "In progress" },
  { id: "Completed", label: "Completed" },
];

export default function FilterTabs({ value, onChange, totalCount }) {
  return (
    <div className="tabs" role="tablist" aria-label="Filter by status">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          className={value === tab.id ? "tab is-active" : "tab"}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.id === "All" && <span className="tab-count">{totalCount}</span>}
        </button>
      ))}
    </div>
  );
}