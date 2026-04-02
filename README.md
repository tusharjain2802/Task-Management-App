# Task-Management-App

# 📝 Task Management System (Full-Stack)

A full-stack task management application that allows users to securely register, log in, and manage their personal tasks with full CRUD functionality. Built using **Node.js, TypeScript, SQL, Prisma, and Next.js**.

---

## 🚀 Features

### 🔐 Authentication & Security
- User Registration & Login
- JWT-based authentication:
  - Access Token (short-lived)
  - Refresh Token (long-lived)
- Secure password hashing using bcrypt
- Logout with token invalidation

---

### 📋 Task Management
- Create, Read, Update, Delete tasks
- Toggle task completion status
- Tasks are user-specific (multi-user support)

---

### 🔍 Advanced Task Listing
- Pagination (load tasks in batches)
- Filtering (by status: completed/pending)
- Searching (by title)

---

### 💻 Frontend (Next.js)
- Responsive UI (desktop + mobile)
- Login & Registration pages
- Task dashboard with:
  - Search
  - Filters
  - Pagination
- Toast notifications for actions

---

## 🏗️ Tech Stack

### Backend
- Node.js
- TypeScript
- Prisma ORM
- SQL Database (PostgreSQL / MySQL)
- JWT Authentication
- bcrypt

### Frontend
- Next.js (App Router)
- TypeScript
- Axios / Fetch API
- Tailwind CSS (optional)

---

## 📁 Project Structure

/server  
&nbsp;&nbsp;/src  
&nbsp;&nbsp;&nbsp;&nbsp;/controllers  
&nbsp;&nbsp;&nbsp;&nbsp;/routes  
&nbsp;&nbsp;&nbsp;&nbsp;/config
&nbsp;&nbsp;&nbsp;&nbsp;/middlewares  
&nbsp;&nbsp;&nbsp;&nbsp;/models  
&nbsp;&nbsp;&nbsp;&nbsp;/utils  
&nbsp;&nbsp;index.js  

/client  
&nbsp;&nbsp;/app  
&nbsp;&nbsp;&nbsp;&nbsp;/login  
&nbsp;&nbsp;&nbsp;&nbsp;/register  
&nbsp;&nbsp;&nbsp;&nbsp;/dashboard  
&nbsp;&nbsp;/components  
&nbsp;&nbsp;/layout
&nbsp;&nbsp;/pages  
&nbsp;&nbsp;/assets
&nbsp;&nbsp;/asssets

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```
### 2. 
```bash
cd server
npm install
```

3. Frontend setup
```bash
cd ../client
npm install
npm run dev
```

