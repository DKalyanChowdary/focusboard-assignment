import { LayoutGrid, ListChecks, Calendar, Settings } from "lucide-react";

export const NAV_ITEMS = [
  { id: "overview", label: "Overview", mobileLabel: "Overview", icon: LayoutGrid },
  { id: "tasks", label: "My tasks", mobileLabel: "Tasks", icon: ListChecks },
  { id: "calendar", label: "Calendar", mobileLabel: "Calendar", icon: Calendar },
  { id: "settings", label: "Settings", mobileLabel: "Settings", icon: Settings },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <LayoutGrid size={16} />
        </span>
        <span className="brand-name">FocusBoard</span>
      </div>

      <nav className="nav" aria-label="Main">
        <p className="nav-heading">Workspace</p>
        <ul>
          {NAV_ITEMS.map(({ id, label, mobileLabel, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                className={`nav-item${active === id ? " is-active" : ""}`}
                aria-current={active === id ? "page" : undefined}
                onClick={() => onNavigate(id)}
              >
                <Icon size={16} aria-hidden="true" />
                <span className="nav-label">{label}</span>
                <span className="nav-label-mobile">{mobileLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}