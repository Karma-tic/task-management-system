Task Management System (MERN)

A full-stack task management application built using the MERN stack, featuring role-based access, task assignment, and a clean dashboard UI.

Key Features
Authentication & Roles

JWT-based login & signup

Admin and User roles

Admin defined via environment variable

Task Management

Create, edit, delete tasks

Assign tasks to users (admin only)

Update task status (pending / completed)

View only assigned tasks

Task details page

Priority levels (High / Medium / Low)

Pagination & sorting

Admin Capabilities

View all users

Promote users to admin

Delete users

View all tasks

🛠 Tech Stack

Frontend: React, Context API, CSS
Backend: Node.js, Express, MongoDB
Auth: JWT, bcrypt
Database: MongoDB

⚙️ Setup
Backend
cd server
npm install
npm run dev


Create .env:

PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/task_manager
JWT_SECRET=your_secret
ADMIN_EMAIL=admin@example.com

Frontend
cd client
npm install
npm run dev

👤 Roles
Admin

Can manage users

Can assign tasks

Can view all tasks

Can delete any task

User

Can create tasks

Can update their own tasks

Can view assigned tasks

📌 Notes

Admin role is automatically assigned using ADMIN_EMAIL

Access is protected using middleware

UI adapts based on user role

✅ Status

✔ Fully functional
✔ Role-based
✔ Production-style structure
✔ Assessment ready

👨‍💻 Author

Sujeet Singh