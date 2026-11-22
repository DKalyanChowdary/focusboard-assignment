import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog.jsx";
import { getInitials } from "./Header.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Settings({ profile, taskCount, onSaveProfile, onRestoreSamples, onClearTasks }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(null); // "restore" | "clear" | null

  const handleSave = (e) => {
    e.preventDefault();
    const found = {};
    if (!name.trim()) found.name = "Enter your name.";
    if (!EMAIL_RE.test(email.trim())) found.email = "Enter a valid email address.";
    setErrors(found);
    if (Object.keys(found).length) return;
    onSaveProfile({ name: name.trim(), email: email.trim() });
  };

  const dialogs = {
    restore: {
      title: "Restore sample tasks?",
      message: "This replaces all your current tasks with the original sample tasks.",
      confirmLabel: "Restore samples",
      action: onRestoreSamples,
    },
    clear: {
      title: "Delete all tasks?",
      message: `All ${taskCount} tasks will be removed from your board. This can't be undone.`,
      confirmLabel: "Delete all",
      action: onClearTasks,
    },
  };
  const active = confirm && dialogs[confirm];

  return (
    <div className="settings">
      <section className="panel" aria-labelledby="profile-heading">
        <h2 id="profile-heading">Profile</h2>
        <p className="panel-sub">Your name and email appear in the account menu.</p>

        <div className="profile-row">
          <span className="avatar avatar-lg" aria-hidden="true">{getInitials(name)}</span>
          <form onSubmit={handleSave} noValidate className="profile-form">
            <div className="field">
              <label htmlFor="p-name">Name</label>
              <input
                id="p-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })); }}
                {...(errors.name ? { "aria-invalid": "true", "aria-describedby": "p-name-err" } : {})}
              />
              {errors.name && <p className="field-error" id="p-name-err" role="alert">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="p-email">Email</label>
              <input
                id="p-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: undefined })); }}
                {...(errors.email ? { "aria-invalid": "true", "aria-describedby": "p-email-err" } : {})}
              />
              {errors.email && <p className="field-error" id="p-email-err" role="alert">{errors.email}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Save profile</button>
          </form>
        </div>
      </section>

      <section className="panel" aria-labelledby="data-heading">
        <h2 id="data-heading">Data</h2>
        <p className="panel-sub">
          Everything is stored only in this browser (localStorage). You currently have {taskCount} {taskCount === 1 ? "task" : "tasks"}.
        </p>
        <div className="panel-actions">
          <button type="button" className="btn btn-outline" onClick={() => setConfirm("restore")}>Restore sample tasks</button>
          <button type="button" className="btn btn-danger" onClick={() => setConfirm("clear")} disabled={taskCount === 0}>Delete all tasks</button>
        </div>
      </section>

      {active && (
        <ConfirmDialog
          title={active.title}
          message={active.message}
          confirmLabel={active.confirmLabel}
          onConfirm={() => { active.action(); setConfirm(null); }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}