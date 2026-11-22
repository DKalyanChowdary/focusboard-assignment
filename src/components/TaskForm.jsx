import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { STATUSES, PRIORITIES, CATEGORIES } from "../data/sampleTasks.js";

const EMPTY = { title: "", description: "", category: "Design", status: "To do", priority: "Medium", dueDate: "" };

function validate(values) {
  const errors = {};
  const title = values.title.trim();
  if (!title) errors.title = "Enter a task title.";
  else if (title.length > 80) errors.title = "Keep the title under 80 characters.";
  if (!STATUSES.includes(values.status)) errors.status = "Choose a status.";
  if (!PRIORITIES.includes(values.priority)) errors.priority = "Choose a priority.";
  if (!values.dueDate || Number.isNaN(Date.parse(values.dueDate))) errors.dueDate = "Pick a due date.";
  return errors;
}

/** Create when `task` is null, edit when a task is passed. Parent unmounts it to close, which clears the fields. */
export default function TaskForm({ task, initialDate, onSubmit, onCancel }) {
  const isEdit = Boolean(task);
    const [values, setValues] = useState(task ? { ...EMPTY, ...task } : { ...EMPTY, dueDate: initialDate ?? "" });
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onCancel();
    titleRef.current?.focus();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [onCancel]);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector(".modal [aria-invalid='true']")?.focus();
      return;
    }
    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate,
    });
  };

  const err = (f) => (errors[f] ? { "aria-invalid": "true", "aria-describedby": `${f}-error` } : {});
  const msg = (f) => errors[f] && <p className="field-error" id={`${f}-error`} role="alert">{errors[f]}</p>;

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <button type="button" className="modal-close" aria-label="Close" onClick={onCancel}>
          <X size={14} aria-hidden="true" />
        </button>
        <h2 id="task-form-title">{isEdit ? "Edit task" : "Create new task"}</h2>
        <p className="modal-sub">
          {isEdit ? "Update your task details." : "Add your task details to stay on top of your work."}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="title">Task title *</label>
            <input id="title" ref={titleRef} type="text" placeholder="e.g. Update pricing page" value={values.title} onChange={set("title")} {...err("title")} />
            {msg("title")}
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows={3} placeholder="Add notes about this task..." value={values.description} onChange={set("description")} />
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" value={values.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="status">Status *</label>
              <select id="status" value={values.status} onChange={set("status")} {...err("status")}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              {msg("status")}
            </div>
            <div className="field">
              <label htmlFor="priority">Priority *</label>
              <select id="priority" value={values.priority} onChange={set("priority")} {...err("priority")}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
              {msg("priority")}
            </div>
          </div>

          <div className="field">
            <label htmlFor="dueDate">Due date *</label>
            <input id="dueDate" type="date" value={values.dueDate} onChange={set("dueDate")} {...err("dueDate")} />
            {msg("dueDate")}
          </div>

          <p className="required-note">* Required field</p>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? "Save changes" : "Create task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}