# Issue Tracker

A full-stack **issue tracking system** built with Next.js, Prisma, NextAuth, Radix UI, and React Query.  
Visitors can browse issues and see the dashboard. Sign in with Google to create, edit, assign, or delete issues.

---

## 📖 Overview

**Issue Tracker** is a minimal yet powerful web app designed for managing project issues and tracking their lifecycle.  
It combines **Next.js App Router**, **Prisma ORM**, **NextAuth**, and **React Query** for a fully type-safe and reactive experience.

This project can serve as:
- a base for your own task/issue management system,  
- a demonstration of full-stack Next.js architecture,  
- or a learning reference for building production-level CRUD apps with authentication.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | [Next.js 14](https://nextjs.org) |
| Language | TypeScript |
| ORM | [Prisma](https://www.prisma.io) |
| Database | PostgreSQL |
| Authentication | [NextAuth.js](https://next-auth.js.org) |
| UI Library | [Radix UI](https://www.radix-ui.com) + Tailwind CSS |
| State Management | [React Query](https://tanstack.com/query) |
| Forms | [React Hook Form](https://react-hook-form.com) |
| Error Tracking | [Sentry](https://sentry.io) |
| Styling | Tailwind CSS + Typography Plugin |

---

## 🧱 Project Structure

```

issue-tracker/
├── app/                   # Next.js App Router
├── components/            # Reusable UI components
├── lib/                   # Helpers (auth, prisma, validations, etc.)
├── prisma/                # Prisma schema & migrations
├── public/                # Static assets
├── styles/                # Global styles
├── middleware.ts          # Access control middleware
├── instrumentation.ts     # Sentry instrumentation setup
├── next.config.mjs        # Next.js config
├── postcss.config.mjs     # PostCSS config
├── components.json        # UI configuration
├── package.json
└── tsconfig.json

````

---

## 🚀 Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/cementix/issue-tracker.git
cd issue-tracker
````

### 2. Install dependencies

```bash
yarn install --frozen-lockfile
```

### 3. Environment variables

Copy `.env.example` to `.env`. Set `DATABASE_URL` to a PostgreSQL database for this app and generate a secret for `NEXTAUTH_SECRET`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Google is the only sign-in provider. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from a Google OAuth web application. Register `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI. For deployment, set `NEXTAUTH_URL` to the site's HTTPS origin and register the same callback path on that origin.

---

## 🧩 Database Setup

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

A new database starts with zero issues and zero users. The first Google sign-in creates a user.

Inspect your data with Prisma Studio:

```bash
npx prisma studio
```

To empty an existing installation, first verify that the connection points to the intended database. The following command permanently removes all issues, users, and sign-in records while preserving the schema and migration history:

```bash
npx prisma db execute --schema prisma/schema.prisma --file scripts/reset-data.sql
```

On the deployed app, also rotate `NEXTAUTH_SECRET` and redeploy to invalidate existing browser sessions.

---

## 🧠 Development

Start the dev server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Lint check

```bash
npm run lint
```

---

## 🔗 Core Features

* 🧾 Create, edit, and delete issues
* 👥 Assign issues to users
* 🔐 Authentication & session handling (NextAuth)
* 📊 Dashboard with issue counts and the latest issues, refreshed after changes
* 🎨 Clean and accessible UI with Radix + Tailwind
* 📈 Error tracking integrated via Sentry
* 🧩 Scalable modular architecture

---

The [Prisma schema](prisma/schema.prisma) defines issues, their statuses and assignments, and the tables used for Google sign-in.

---

## ☁️ Deployment

Recommended:

* **Vercel** for hosting Next.js
* **Railway / Supabase / Render** for database hosting
* **Sentry** for error tracking

Steps:

1. Add all `.env` variables to the deployment environment.
2. Push code to Vercel or your host.
3. Deploy Prisma migrations:

   ```bash
   npx prisma migrate deploy
   ```
4. Monitor logs and errors via **Sentry** dashboard.

---

## 🧩 API Endpoints

| Method                    | Route                        | Description |
| ------------------------- | ---------------------------- | ----------- |
| `POST /api/issues`        | Create a new issue           |             |
| `PATCH /api/issues/[id]`  | Update issue                 |             |
| `DELETE /api/issues/[id]` | Delete issue                 |             |
| `GET /api/users`          | Get user list for assignment |             |
| `GET /api/auth/signin`    | Google sign-in page          |             |

---

## 🧤 Developer Notes

* Protected routes managed via `middleware.ts`
* API route handlers live under `app/api`
* `instrumentation.ts` initializes Sentry for error tracing
* Radix UI components are wrapped in Tailwind for styling consistency
* React Query manages data fetching and cache invalidation
* Maintain version sync between `prisma` and `@prisma/client`
