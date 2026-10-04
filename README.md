# TeamUp – Find Your Dream Hackathon Team 🚀

TeamUp is a full-stack web application that helps developers find and join teams for hackathons.

Users can create teams, search for existing teams, send join requests, and manage those requests through a simple and responsive interface.

## 🌐 Live Demo

https://team-up-hackathon.vercel.app/

## ✨ Features

* 🔐 User Signup and Login
* 🔑 JWT-based Authentication
* 👥 Create and manage hackathon teams
* 🔎 Search teams by team name or project title
* 🤝 Send join requests to teams
* 🚫 Prevent duplicate join requests
* 🚫 Prevent users from joining their own team
* 📩 View sent join requests
* ✅ Team owners can accept or reject requests
* 👤 Team owners can view their created teams
* 🗑️ Team owners can delete their teams
* 📱 Responsive design for mobile and desktop

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt

### Deployment

* Vercel

## 🔄 How It Works

1. A user creates an account and logs in.
2. The backend verifies the credentials and generates a JWT token.
3. The user can create a hackathon team by providing team details.
4. Other users can search for teams and send join requests.
5. The team owner can view pending requests.
6. The owner can accept or reject a request.
7. The requester can view the updated request status from **My Requests**.

## 🔐 Authentication Flow

TeamUp uses JWT-based authentication.

```text
User Login
    ↓
Backend verifies credentials
    ↓
JWT token generated
    ↓
Token stored on frontend
    ↓
Token sent with protected API requests
    ↓
authMiddleware verifies token
    ↓
Backend identifies the logged-in user
```

Passwords are securely hashed using bcrypt before being stored in the database.

## 🗄️ Database

TeamUp uses MongoDB with Mongoose.

Main models:

* **User** – stores user account information
* **Team** – stores hackathon team and project details
* **JoinRequest** – stores team join requests and their status

Join request status can be:

```text
pending
accepted
rejected
```

## 📁 Project Structure

```text
TeamUp-Hackathon/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── models/
│   ├── middleware/
│   └── ...
│
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/anushkasricodes07/TeamUp-Hackathon.git
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Start the backend

```bash
cd server
node index.js
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

The frontend will run on the local Vite development server.

## 🎯 Project Goal

The goal of TeamUp is to make it easier for developers and students to find suitable teammates for hackathons based on their project requirements and required roles.

## 🚀 Future Improvements

Some possible future improvements include:

* User profiles
* Better team filtering
* Notifications
* Dark/light mode
* More advanced team management



GitHub:
https://github.com/anushkasricodes07

---

⭐ If you find this project useful, feel free to star the repository.
