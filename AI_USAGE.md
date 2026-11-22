# AI Usage

## Summary
I built FocusBoard using Claude (Anthropic) as an AI pair-programming assistant. I owned the requirements, testing, debugging, Git workflow and deployment. Claude generated most of the initial code, which I reviewed, ran and tested step by step.

## My role
- **Directed the build:** broke the assignment into steps (layout,  search and  localStorage) and gave Claude the requirements for each one, with the Figma screenshot as reference.
- **Tested every feature in the browser:** create, edit, delete, status toggle, search, combined filters, carousel navigation, persistence after refresh and the mobile layout.
- **Found and reported problems:** I noticed the sidebar items and profile avatar did nothing when clicked, which led to the working Calendar, Settings and profile menu.
- **Handled delivery:** fixed Git issues (remote URL, GitHub email privacy) and Vercel for deploy tool suggesstion.

## What Claude generated
- Component CSS and the `useLocalStorage` hook,data.
- Form validation.

## What I understand and can explain
- **State:** `App.jsx` owns the tasks array, and create, edit, delete and status changes all update it, so the list and statistics stay in sync.
- **localStorage:** the hook loads saved tasks from `focusboard_tasks` on startup and saves on every change. Sample data is used only when nothing valid is saved.
- **Filtering:** `TaskList` applies search text, status and priority together to the same task list.
- **Statistics:** `getStats()` derives total, in progress, completed and completion % from the task data, with a zero-task guard.
- **Reusable components:** one `TaskForm` serves create and edit, and `StatCard`, `TaskCard`, `FilterTabs` and `ConfirmDialog` are reused.

## Limitations
- Behaviour was verified by manual browser testing, with no automated tests.
- Colours and sizes were estimated from a screenshot, so they may differ slightly from the Figma file.
