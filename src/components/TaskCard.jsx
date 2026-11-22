import { Calendar, Check, Circle, Pencil, Trash2 } from "lucide-react";

const formatDate = (iso) =>
  iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "No date";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const done = task.status === "Completed";
  return (
    <li className={done ? "task is-done" : "task"}>
      <button
        type="button"
        className={done ? "check is-checked" : "check"}
        aria-label={done ? `Mark "${task.title}" as not completed` : `Mark "${task.title}" as completed`}
        aria-pressed={done}
        onClick={() => onToggle(task.id)}
      >
        {done ? <Check size={12} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
      </button>

      <div className="task-main">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-sub">{[task.description, task.status !== "Completed" && task.status].filter(Boolean).join(" · ")}</p>
      </div>

      <div className="task-meta">
        <span className={`pill cat-${task.category.toLowerCase()}`}>{task.category}</span>
        <span className={`pill prio-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <span className="due">
          <Calendar size={12} aria-hidden="true" />
          {formatDate(task.dueDate)}
        </span>
      </div>

      <div className="actions">
        <button type="button" className="icon-action" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task.id)}>
          <Pencil size={14} aria-hidden="true" />
        </button>
        <button type="button" className="icon-action danger" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}>
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}