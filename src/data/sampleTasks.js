export const STORAGE_KEY = "focusboard_tasks";

export const sampleTasks = [
  { id: "t1", title: "Design landing page", description: "Website redesign", category: "Design", priority: "High", status: "In progress", dueDate: "2026-11-22" },
  { id: "t2", title: "Fix mobile navigation", description: "Frontend sprint", category: "Development", priority: "Medium", status: "To do", dueDate: "2026-11-24" },
  { id: "t3", title: "Review onboarding copy", description: "Content updates", category: "Content", priority: "Low", status: "Completed", dueDate: "2026-11-18" },
  { id: "t4", title: "Plan Q1 campaign", description: "Marketing roadmap", category: "Marketing", priority: "High", status: "In progress", dueDate: "2026-11-26" },
  { id: "t5", title: "Set up CI pipeline", description: "Automate test runs", category: "Development", priority: "Medium", status: "Completed", dueDate: "2026-11-15" },
  { id: "t6", title: "Update brand guidelines", description: "Colours and typography", category: "Design", priority: "Low", status: "To do", dueDate: "2026-11-30" },
  { id: "t7", title: "Write release notes", description: "Version 1.2 changelog", category: "Content", priority: "Medium", status: "In progress", dueDate: "2026-11-25" },
  { id: "t8", title: "Fix checkout bug", description: "Payment form validation", category: "Development", priority: "High", status: "Completed", dueDate: "2026-11-20" },
];

export const STATUSES = ["To do", "In progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];
export const CATEGORIES = ["Design", "Development", "Content", "Marketing", "Other"];