# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# FocusBoard

A responsive task management dashboard built with React and Vite, based on the company Figma design.

**Live demo:** https://focusboard-assignment.vercel.app/
**Source code:** https://github.com/DKalyanChowdary/focusboard-assignment

## Features

- **Task CRUD:** create, edit, delete and complete tasks, using one reusable form for create and edit.
- **Delete confirmation:** a dialog confirms before any task is removed.
- **Dynamic statistics:** total, in progress, completed and completion %, all calculated from the task data. Zero tasks is handled, so there is no divide-by-zero.
- **Focus Notes carousel:** three slides with previous/next buttons, clickable indicators and circular navigation.
- **Search and filters:** case-insensitive partial title search, status tabs (All, To do, In progress, Completed) and a priority filter. All three work together, and there is a reset option.
- **Persistence:** tasks are saved in the browser with `localStorage`, so they survive a refresh.
- **Responsive design:** a sidebar on desktop and a bottom navigation bar on mobile.
- **Accessibility:** semantic HTML, labelled controls, keyboard support (Escape closes dialogs) and visible focus states.
- **Extra screens:** a Calendar (tasks by due date) and Settings (profile and data options).

## Tech stack

- React 18+ with hooks
- Vite
- Lucide React (icons)
- Plain CSS
- `localStorage` for data (no backend)

## Run public url


Open https://focusboard-assignment.vercel.app/. To create a production build, run `npm run build`.

## Project structure

```
src/
├── components/
│   ├── Sidebar.jsx        navigation (bottom bar on mobile)
│   ├── Header.jsx         breadcrumb, profile menu, page title
│   ├── StatCard.jsx       reusable statistic card
│   ├── FocusNotes.jsx     three-slide carousel
│   ├── TaskList.jsx       filtering logic and delete confirmation
│   ├── TaskCard.jsx       one task row
│   ├── TaskForm.jsx       create and edit form with validation
│   ├── SearchBar.jsx      search input
│   ├── FilterTabs.jsx     status tabs
│   ├── ConfirmDialog.jsx  reusable confirmation dialog
│   ├── Calendar.jsx       month view of due dates
│   └── Settings.jsx       profile and data settings
├── data/sampleTasks.js    sample tasks and option lists
├── hooks/useLocalStorage.js
├── App.jsx                owns the task state
├── main.jsx
└── index.css
```

## How it works

**State:** `App.jsx` holds the tasks array. Create, edit, delete and status changes all update this one state, so the list and statistics always stay in sync.

**localStorage:** the `useLocalStorage` hook reads tasks from the key `focusboard_tasks` on startup and writes them back whenever they change. Sample data is only used when nothing valid is saved, so it never overwrites saved tasks. Corrupt or unavailable storage falls back safely.

**Filtering:** `TaskList` keeps the search text, status tab and priority in state. The visible tasks are the ones matching all three at once.

**Statistics:** calculated in `getStats()` in `App.jsx`:


## Screenshots
Desktop
Mobile 
