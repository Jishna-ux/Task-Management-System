# Fullstack Task Manager

A MERN team task manager with JWT login, administrator and member permissions, task dashboards, assignment, subtasks, comments, and protected local file attachments.

## Architecture

- `client/`: React + Vite, Redux Toolkit, React Router, Tailwind CSS, Headless UI, Axios, and Lucide icons.
- `server/`: Express REST API, Mongoose models, JWT and bcrypt authentication, role/assignment authorization, rate-limited login, and Multer uploads.
- MongoDB stores accounts, tasks, subtasks, attachments metadata, comments, and activity events. Uploaded files live in `server/uploads/` during development.

## Setup

Requirements: Node.js 20+ and a running MongoDB instance (local MongoDB or an Atlas URI).

```sh
npm install
npm install --prefix server
npm install --prefix client
```

Copy `server/.env.example` to `server/.env`. Set a unique random `JWT_SECRET`, the MongoDB URI, and administrator credentials. Keep `.env` private and change the sample admin password before seeding.

```sh
cd server
npm run seed
cd ..
npm run dev
```

Frontend: `http://localhost:5173` · API: `http://localhost:8800/api` · health: `http://localhost:8800/api/health`.

For production, build with `npm run build` from the project root and deploy the static `client/dist` separately from the API. Configure `CLIENT_URL`, HTTPS, secret management, backups, and persistent/cloud attachment storage.

## API overview

All protected routes use `Authorization: Bearer <token>`. Authentication: `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `POST /api/auth/change-password`. Profile: `GET/PATCH /api/profile`. Admin user management: `GET/POST /api/users`, `PATCH /api/users/:id` and `/status`. Tasks: `GET/POST /api/tasks`, `GET/PATCH/DELETE /api/tasks/:id`, `PATCH /api/tasks/:id/status`, and nested `/subtasks`, `/comments`, `/attachments`. Dashboard: `GET /api/dashboard`.

Members only see assigned tasks and can change task status, add comments, and upload files. Admins manage accounts, task fields, assignments, and subtasks. `DELETE /tasks/:id` moves a task to trash; `GET /tasks?trash=true` lists trashed tasks, and deleting it again restores it. Task attachment downloads require authentication and task access.

## Notes

- No public registration endpoint exists. Create all accounts through the administrator dashboard or the admin-only API.
- Attachments allow supported image, PDF, text, zip, and Office MIME types up to 10 MB. Production deployments should use object storage and malware scanning.
- This starter implements persisted task discussion and a basic activity timeline for task creation and status/detail changes. Email, real-time collaboration, avatar upload, and permanent trash deletion are optional extensions.
- `npm run build` builds the frontend; backend connection and permissions require MongoDB to be available.
