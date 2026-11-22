import { useCallback, useEffect, useMemo, useState } from "react";
import { ListChecks, Clock, CheckCircle2, Percent } from "lucide-react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import StatCard from "./components/StatCard.jsx";
import FocusNotes from "./components/FocusNotes.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import Calendar from "./components/Calendar.jsx";
import Settings from "./components/Settings.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { sampleTasks, STORAGE_KEY } from "./data/sampleTasks.js";

const PROFILE_KEY = "focusboard_profile";
const DEFAULT_PROFILE = { name: "D.Kayan", email: "kalyanchowdarydoppalapudi@example.com" };
const isProfile = (v) => v && typeof v.name === "string" && typeof v.email === "string";

const isTaskArray = (v) =>
  Array.isArray(v) && v.every((t) => t && typeof t.id === "string" && typeof t.title === "string" && t.status && t.priority);

const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function getStats(tasks) {
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const completion = total === 0 ? 0 : Math.round((completed / total) * 100); // no divide-by-zero
  const nextTask = tasks.find((t) => t.status !== "Completed");
  return { total, inProgress, completed, completion, nextTask };
}

export default function App() {
  const [view, setView] = useState("overview"); // overview | tasks | calendar | settings
  const [notice, setNotice] = useState("");
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, sampleTasks, isTaskArray);
  const [profile, setProfile] = useLocalStorage(PROFILE_KEY, DEFAULT_PROFILE, isProfile);
  const [form, setForm] = useState(null); // null = closed, { task: null, date } = create, { task } = edit

  const stats = useMemo(() => getStats(tasks), [tasks]);

  // hide the small message after 2.5s
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(timer);
  }, [notice]);

  const navigate = (id) => {
    setView(id);
    window.scrollTo({ top: 0 });
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "Completed" ? "To do" : "Completed" } : t))
    );

  const openCreate = () => setForm({ task: null, date: null });
  const openCreateOn = (date) => setForm({ task: null, date });
  const openEdit = (id) => setForm({ task: tasks.find((t) => t.id === id) ?? null, date: null });
  const closeForm = useCallback(() => setForm(null), []);

  const saveTask = (values) => {
    if (form.task) {
      // replace only the selected task; its id is preserved
      setTasks((prev) => prev.map((t) => (t.id === form.task.id ? { ...t, ...values, id: t.id } : t)));
    } else {
      setTasks((prev) => [{ id: newId(), ...values }, ...prev]);
    }
    closeForm();
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const saveProfile = (p) => {
    setProfile(p);
    setNotice("Profile saved.");
  };
  const restoreSamples = () => {
    setTasks(sampleTasks);
    setNotice("Sample tasks restored.");
  };
  const clearTasks = () => {
    setTasks([]);
    setNotice("All tasks deleted.");
  };

  const taskList = (
    <section id="tasks-section" aria-label="My tasks">
      <TaskList
        tasks={tasks}
        totalCount={stats.total}
        onToggle={toggleTask}
        onNewTask={openCreate}
        onEdit={openEdit}
        onDelete={deleteTask}
      />
    </section>
  );

  return (
    <div className="app">
      <Sidebar active={view} onNavigate={navigate} />

      <main className="main">
        <Header view={view} profile={profile} onNewTask={openCreate} onNavigate={navigate} />

        <div className="content">
          {view === "overview" && (
            <>
              <section aria-label="Focus notes">
                <FocusNotes stats={stats} />
              </section>

              <section aria-label="Overview" className="stats">
                <StatCard title="Total tasks" value={stats.total} hint="Across all projects" icon={ListChecks} tone="violet" />
                <StatCard title="In progress" value={stats.inProgress} hint="Keep the momentum" icon={Clock} tone="blue" />
                <StatCard title="Completed" value={stats.completed} hint="Great work this week" icon={CheckCircle2} tone="green" />
                <StatCard title="Completion" value={`${stats.completion}%`} hint="Of all tasks" icon={Percent} tone="amber" />
              </section>

              {taskList}
            </>
          )}

          {view === "tasks" && taskList}

          {view === "calendar" && <Calendar tasks={tasks} onAddTask={openCreateOn} onEditTask={openEdit} />}

          {view === "settings" && (
            <Settings
              profile={profile}
              taskCount={tasks.length}
              onSaveProfile={saveProfile}
              onRestoreSamples={restoreSamples}
              onClearTasks={clearTasks}
            />
          )}
        </div>
      </main>

      {form && (
        <TaskForm
          key={form.task?.id ?? "new"}
          task={form.task}
          initialDate={form.date}
          onSubmit={saveTask}
          onCancel={closeForm}
        />
      )}

      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}