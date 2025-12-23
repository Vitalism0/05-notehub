# 05-notehub
# NoteHub 🗒️

NoteHub is a web app for **storing, creating, deleting, and searching notes** with **pagination** and **debounced search**. Notes are stored on a ready-to-use backend, and all server state is managed with **TanStack Query**.

## 🔗 Links
- Repository: https://github.com/Vitalism0/05-notehub
- Live (Vercel): https://05-notehub-ochre-six.vercel.app/

## ⚙️ Tech Stack
- **React + TypeScript**
- **Vite**
- **Axios** — HTTP requests
- **TanStack Query (React Query)** — server state management & caching
- **React Paginate** — pagination UI
- **Formik + Yup** — form handling and validation
- **use-debounce** — debounced search
- **CSS Modules** — styling
- **modern-normalize** — consistent base styles across browsers
- **Prettier** — code formatting

## ✅ Features
- Fetch notes on initial load
- Paginated notes list (`page` / `perPage`)
- Debounced search by keyword (`search`)
- Create a note in a modal form (Formik + Yup)
- Delete a note with automatic cache invalidation / refetch

## 🧩 Components
- `App` — application container (header + list + query state)
- `NoteList` — renders a collection of notes
- `Modal` — reusable modal (createPortal, closes on backdrop click / Escape)
- `NoteForm` — create note form (Formik + Yup)
- `Pagination` — page navigation using React Paginate
- `SearchBox` — search input

### Conditional Rendering
- `NoteList` is rendered only when there is at least one note
- `Pagination` is rendered only when total pages > 1

## 🔐 Environment Variables
The backend expects the token in the `Authorization` header:

`Bearer YOUR_TOKEN`

**Do not store the token in the code.** Use `.env` instead.

1) Create a `.env` file in the project root
2) Add:

```env
VITE_NOTEHUB_TOKEN=your_token_here
