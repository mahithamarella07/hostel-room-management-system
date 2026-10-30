
# 🏡 Haven – Hostel Room Record Management System

Haven is a web-based Hostel Room Record Management System developed to help hostel staff maintain and manage room allocation records efficiently.

## ✨ Features

- Add new hostel room records
- View all saved room records
- Search records using room number
- Update existing room and student details
- Delete room records with confirmation
- Dashboard with room statistics
- Form validation and error messages
- Responsive user interface

## 🛠️ Technologies Used

### Frontend
- React.js
- Bootstrap
- CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MySQL

## 📋 Room Record Fields

Each room record contains:

1. Room Number
2. Student Name
3. Room Capacity
4. Block

## 📁 Project Structure

```text
hostel-management/
│
├── backend/
│   ├── db.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── StatCard.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── Home.jsx
│   ├── Management.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone or download the project

Open the project folder in VS Code.

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend folder.

Add your MySQL configuration:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hostel_db
```

Replace `your_mysql_password` with your own MySQL password.

### 5. Create the database

Run the following SQL commands in MySQL Workbench:

```sql
CREATE DATABASE hostel_db;
USE hostel_db;

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(20) NOT NULL,
    student_name VARCHAR(100) NOT NULL,
    room_capacity INT NOT NULL,
    block VARCHAR(50) NOT NULL
);
```

### 6. Start the backend

Open a terminal inside the backend folder:

```bash
node server.js
```

### 7. Start the frontend

Open another terminal in the main project folder:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

http://localhost:5173/

## 🎯 Objective

The main objective of Haven is to simplify hostel room record management by providing a centralized system for storing, searching, updating and deleting room allocation information.

## 👩‍💻 Project

**Project Name:** Hostel Room Record Management System  
**Application Name:** Haven
