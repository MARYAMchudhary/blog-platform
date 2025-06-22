# 📝 Mini Blogging Platform

A full-stack mini blogging platform built using **Next.js App Router**, **Supabase (Auth & DB)**, **Drizzle ORM**, **NextAuth.js**, **Redux Toolkit**, and **Cohere AI** for summarization.

This project demonstrates best practices across authentication, database integration, state management, API handling, protected routes, and 3rd-party AI integration.

---

## 🚀 Tech Stack

* **Frontend:** Next.js (App Router), TailwindCSS
* **Backend:** Next.js API Routes
* **Database:** Supabase (PostgreSQL)
* **ORM:** Drizzle ORM
* **Auth:** NextAuth.js (with Supabase adapter)
* **State Management:** Redux Toolkit
* **3rd Party AI API:** Cohere AI Summarization API

---

## 📂 Features

### ✅ Authentication

* Email/password Sign Up & Login using Supabase.
* Protected routes with NextAuth.js.
* Redirect to `/login` if unauthenticated.
* Redirect to `/signup` if login fails for non-existent users.

### ✅ Database Schema (Drizzle ORM)

* Uses Supabase DB with Drizzle ORM for schema migration.
* Tables:

  * `users`: Managed by Supabase Auth.
  * `posts`: Stores user posts with title, content, summary.

### ✅ Backend API Routes (Protected)

* `POST /api/posts/create`: Create a new post.
* `GET /api/posts/lists`: List posts for the logged-in user.
* `POST /api/posts/summary`: Calls Cohere API to generate summary.

### ✅ Frontend Pages

* `/login`: Auth form with redirect to signup on failure.
* `/signup`: Register new users.
* `/dashboard`: Protected welcome screen.
* `/dashboard/create`: Create new blog post.
* `/dashboard/list`: List posts with “Generate Summary” button.

### ✅ Redux Toolkit

* `authSlice`: Manages user session globally.
* `postSlice`: Manages posts list and loading states.
* Global Redux store via `store.ts`.

### ✅ Cohere AI Summarization

* Integrated Cohere’s summarization API.
* Auto-generates a medium-length paragraph summary for a post.
* Uses `/api/posts/summary` internally.

---

## 🧠 Bonus Features (Completed)

* ✅ TailwindCSS UI
* ✅ Form validation local
* ✅ Toast notifications (`react-hot-toast`)
* ✅ Graceful error handling
* ✅ Conditional rendering based on auth state

---

## 🛠️ How to Run the Project Locally

Follow these steps to run this full-stack blogging platform on your local machine:

### ✅ 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-blog-platform.git
cd mini-blog-platform
```

### ✅ 2. Install dependencies

```bash
npm install
```

### ✅ 3. Set up environment variables

Create a `.env.local` file in the root directory and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

COHERE_API_KEY=your-cohere-api-key
DATABASE_URL=your-supabase-postgres-url
```

> 📌 You can find these in your [Supabase Dashboard](https://app.supabase.com/) and [Cohere account](https://dashboard.cohere.com/).

### ✅ 4. Run Drizzle DB Migration

```bash
npx drizzle-kit push:pg
```

### ✅ 5. Start the dev server

```bash
npm run dev
```

Visit:
📍 `http://localhost:3000`

### ✅ 6. Sign up and test

* Go to `/signup`, create a new user.
* Confirm the email via your inbox.
* Login at `/login`.
* Create and summarize posts from the dashboard.

---

## 📤 Submission

* Public GitHub repo link
* Includes `.env.example` (no real secrets)
* All code in clean modular format

---

## 🔐 Key Objective

This project reflects **production-grade best practices** for scalable full-stack apps:

* Clean separation of concerns
* Proper error handling and auth
* Global state management with Redux
* Secure API routes
* 3rd-party AI integration

---

## 🤖 Cohere Summarization API Reference

* **Endpoint:** `https://api.cohere.ai/v1/summarize`
* **Method:** `POST`
* **Headers:**

```json
{
  "Authorization": "Bearer YOUR_COHERE_API_KEY",
  "Content-Type": "application/json"
}
```

* **Body:**

```json
{
  "text": "Your content here",
  "length": "medium",
  "format": "paragraph",
  "model": "command"
}
`
