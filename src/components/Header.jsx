import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export const getInitials = (name = "") =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "?";

const VIEWS = {
  overview: {
    crumb: "Overview",
    title: (<>Your work, <br className="only-mobile" />in focus.</>),
    desktop: "Plan your day, stay organized, and celebrate small wins.",
    mobile: "Stay organized and keep moving forward.",
    showNew: true,
  },
  tasks: {
    crumb: "My tasks",
    title: "Your tasks",
    desktop: "Search, filter and manage every task.",
    mobile: "Search, filter and manage tasks.",
    showNew: true,
  },
  calendar: {
    crumb: "Calendar",
    title: "Calendar",
    desktop: "See what's due and when.",
    mobile: "See what's due and when.",
    showNew: true,
  },
  settings: {
    crumb: "Settings",
    title: "Settings",
    desktop: "Manage your profile and data.",
    mobile: "Manage your profile and data.",
    showNew: false,
  },
};

export default function Header({ view, profile, onNewTask, onNavigate }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const v = VIEWS[view] ?? VIEWS.overview;

  // close the profile menu on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !wrapRef.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="header">
      <div className="topbar">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <span>Workspace</span>
          <span aria-hidden="true">/</span>
          <span className="breadcrumb-current">{v.crumb}</span>
        </nav>

        <div className="profile-wrap" ref={wrapRef}>
          <button
            type="button"
            className="profile"
            aria-label="Account menu"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="avatar">{getInitials(profile.name)}</span>
            <ChevronDown size={14} aria-hidden="true" />
          </button>

          {open && (
            <div className="profile-menu">
              <p className="pm-name">{profile.name}</p>
              <p className="pm-email">{profile.email}</p>
              <button
                type="button"
                className="pm-item"
                onClick={() => {
                  setOpen(false);
                  onNavigate("settings");
                }}
              >
                Profile &amp; settings
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="page-title">
        <div>
          <h1>{v.title}</h1>
          <p className="subtitle">
            <span className="desktop-copy">{v.desktop}</span>
            <span className="mobile-copy">{v.mobile}</span>
          </p>
        </div>
        {v.showNew && (
          <button type="button" className="btn btn-primary" onClick={onNewTask}>
            New task
          </button>
        )}
      </div>
    </header>
  );
}