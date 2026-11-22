import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pencil, Plus } from "lucide-react";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n) => String(n).padStart(2, "0");
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s) => new Date(s + "T00:00:00");

export default function Calendar({ tasks, onAddTask, onEditTask }) {
  const todayISO = toISO(new Date());
  const [cursor, setCursor] = useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const [selected, setSelected] = useState(todayISO);

  // group tasks by due date: { "2026-11-22": [task, ...] }
  const byDate = useMemo(() => {
    const map = {};
    tasks.forEach((t) => {
      if (t.dueDate) (map[t.dueDate] ||= []).push(t);
    });
    return map;
  }, [tasks]);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cellCount = Math.ceil((first.getDay() + daysInMonth) / 7) * 7;
  const days = Array.from({ length: cellCount }, (_, i) => new Date(year, month, 1 - first.getDay() + i));

  const goMonth = (delta) => setCursor(new Date(year, month + delta, 1));
  const goToday = () => {
    const t = new Date();
    setCursor(new Date(t.getFullYear(), t.getMonth(), 1));
    setSelected(todayISO);
  };
  const selectDay = (d) => {
    setSelected(toISO(d));
    if (d.getMonth() !== month) setCursor(new Date(d.getFullYear(), d.getMonth(), 1));
  };

  const selectedTasks = byDate[selected] ?? [];

  return (
    <div className="cal-wrap">
      <div className="cal">
        <div className="cal-head">
          <h2>{cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
          <div className="cal-nav">
            <button type="button" className="btn btn-outline cal-today" onClick={goToday}>Today</button>
            <button type="button" className="icon-action" aria-label="Previous month" onClick={() => goMonth(-1)}>
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" className="icon-action" aria-label="Next month" onClick={() => goMonth(1)}>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="cal-grid">
          {DOW.map((d) => (
            <div key={d} className="cal-dow">{d}</div>
          ))}
          {days.map((d) => {
            const iso = toISO(d);
            const list = byDate[iso] ?? [];
            const cls = ["cal-cell", d.getMonth() !== month && "is-out", iso === todayISO && "is-today", iso === selected && "is-selected"]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={iso}
                type="button"
                className={cls}
                aria-pressed={iso === selected}
                aria-label={`${d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}, ${list.length} ${list.length === 1 ? "task" : "tasks"}`}
                onClick={() => selectDay(d)}
              >
                <span className="cal-num">{d.getDate()}</span>
                <span className="cal-chips">
                  {list.slice(0, 2).map((t) => (
                    <span key={t.id} className={`cal-chip chip-${t.priority.toLowerCase()}${t.status === "Completed" ? " is-done" : ""}`}>
                      {t.title}
                    </span>
                  ))}
                  {list.length > 2 && <span className="cal-more">+{list.length - 2} more</span>}
                </span>
                <span className="cal-dots">
                  {list.slice(0, 4).map((t) => (
                    <span key={t.id} className={`cal-dot chip-${t.priority.toLowerCase()}`} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="day-panel">
        <div className="day-head">
          <h3>{fromISO(selected).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h3>
          <button type="button" className="btn btn-soft" onClick={() => onAddTask(selected)}>
            <Plus size={12} aria-hidden="true" /> Add task
          </button>
        </div>

        {selectedTasks.length ? (
          <ul className="day-list">
            {selectedTasks.map((t) => (
              <li key={t.id} className="day-task">
                <div className="task-main">
                  <p className="task-title">{t.title}</p>
                  <p className="task-sub">{t.status}</p>
                </div>
                <span className={`pill prio-${t.priority.toLowerCase()}`}>{t.priority}</span>
                <button type="button" className="icon-action" aria-label={`Edit ${t.title}`} onClick={() => onEditTask(t.id)}>
                  <Pencil size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="day-empty">Nothing due on this day.</p>
        )}
      </div>
    </div>
  );
}