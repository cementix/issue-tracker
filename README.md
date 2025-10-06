# Issue Tracker

A full-stack **issue tracking system** built with Next.js, Prisma, NextAuth, Radix UI, and React Query.  
It allows authenticated users to create, assign, and manage issues in real time, providing a clear structure for team collaboration and bug reporting.

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
| Database | PostgreSQL / SQLite |
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
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment variables

Create a `.env` file in the root folder:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/issue-tracker"

NEXTAUTH_SECRET="your_random_secret"
NEXTAUTH_URL="http://localhost:3000"

SENTRY_AUTH_TOKEN="your_sentry_token"

# Optional (if using external services)
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

> For local development, you can switch to SQLite:
>
> ```
> DATABASE_URL="file:./dev.db"
> ```

---

## 🧩 Database Setup

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Inspect your data with Prisma Studio:

```bash
npx prisma studio
```

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
* ⚡ Real-time updates with React Query
* 🎨 Clean and accessible UI with Radix + Tailwind
* 📈 Error tracking integrated via Sentry
* 🧩 Scalable modular architecture

---

## 🗃 Example Prisma Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String
  issues    Issue[]  @relation("AssignedIssues")
  createdAt DateTime @default(now())
}

model Issue {
  id          String   @id @default(cuid())
  title       String
  description String
  status      String   @default("open")
  priority    String   @default("medium")
  assignee    User?    @relation("AssignedIssues", fields: [assigneeId], references: [id])
  assigneeId  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

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
| `GET /api/issues`         | Get all issues               |             |
| `POST /api/issues`        | Create a new issue           |             |
| `GET /api/issues/[id]`    | Get issue details            |             |
| `PATCH /api/issues/[id]`  | Update issue                 |             |
| `DELETE /api/issues/[id]` | Delete issue                 |             |
| `GET /api/users`          | Get user list for assignment |             |
| `POST /api/auth/signin`   | User login                   |             |
| `POST /api/auth/signup`   | User registration            |             |

---

## 🧤 Developer Notes

* Protected routes managed via `middleware.ts`
* All API logic lives under `/pages/api`
* `instrumentation.ts` initializes Sentry for error tracing
* Radix UI components are wrapped in Tailwind for styling consistency
* React Query manages data fetching and cache invalidation
* Maintain version sync between `prisma` and `@prisma/client`
