# 📝 Mini Blogging Platform

A full-stack mini blogging platform built using **Next.js App Router**, **Supabase (Auth & DB)**, **Drizzle ORM**, **NextAuth.js**, **Redux Toolkit**, and **Cohere AI** for summarization.

This project demonstrates best practices across authentication, database integration, state management, API handling, protected routes, and 3rd-party AI integration.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **ORM:** Drizzle ORM
- **Auth:** NextAuth.js (with Supabase adapter)
- **State Management:** Redux Toolkit
- **3rd Party AI API:** Cohere AI Summarization API

---

## 📂 Features

### ✅ Authentication
- Email/password Sign Up & Login using Supabase.
- Protected routes with NextAuth.js.
- Redirect to `/login` if unauthenticated.
- Redirect to `/signup` if login fails for non-existent users.

### ✅ Database Schema (Drizzle ORM)
- Uses Supabase DB with Drizzle ORM for schema migration.
- Tables:
  - `users`: Managed by Supabase Auth.
  - `posts`: Stores user posts with title, content, summary.

### ✅ Backend API Routes (Protected)
- `POST /api/posts/create`: Create a new post.
- `GET /api/posts/lists`: List posts for the logged-in user.
- `POST /api/posts/summary`: Calls Cohere API to generate summary.

### ✅ Frontend Pages
- `/login`: Auth form with redirect to signup on failure.
- `/signup`: Register new users.
- `/dashboard`: Protected welcome screen.
- `/dashboard/create`: Create new blog post.
- `/dashboard/lists`: List posts with “Generate Summary” button.

### ✅ Redux Toolkit
- `authSlice`: Manages user session globally.
- `postSlice`: Manages posts list and loading states.
- Global Redux store via `store.ts`.

### ✅ Cohere AI Summarization
- Integrated Cohere’s summarization API.
- Auto-generates a medium-length paragraph summary for a post.
- Uses `/api/posts/summary` internally.

---

## 🧠 Bonus Features (Completed)
- ✅ TailwindCSS UI
- ✅ Form validation local
- ✅ Toast notifications (`react-hot-toast`)
- ✅ Graceful error handling
- ✅ Conditional rendering based on auth state

---

## 🛠️ Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-blog-platform.git
cd mini-blog-platform
