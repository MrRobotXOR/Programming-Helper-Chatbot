# Programming Helper Chatbot

An AI-powered Programming Helper Chatbot built with the MERN Stack that helps users solve programming-related queries through a clean chat interface. The application includes secure JWT authentication, chat history management, automatic chat title generation, and AI-generated programming responses.

## Live Demo

* **Frontend:** https://programminghelperchatbotm.vercel.app
* **Backend API:** https://programming-helper-chatbot.onrender.com

## Features

* User Registration and Login using JWT Authentication
* AI-powered Programming Assistance
* Chat History Storage
* Automatic Chat Title Generation
* Delete Chat Functionality
* Syntax Highlighting for Code
* Responsive Dark UI
* Secure MongoDB Atlas Integration
* Vercel + Render Deployment

## Project Architecture

```
User
  │
  ▼
React Frontend (Vercel)
  │
  ▼
Express API (Render)
  │
  ▼
Authentication (JWT)
  │
  ▼
MongoDB Atlas
  │
  ▼
AI Response Service
```

## Tech Stack

| Technology       | Purpose               |
| ---------------- | --------------------- |
| React            | Frontend              |
| Vite             | Frontend Build Tool   |
| Node.js          | Runtime               |
| Express.js       | Backend API           |
| MongoDB Atlas    | Database              |
| Mongoose         | Database ORM          |
| JWT              | Authentication        |
| Bcrypt           | Password Hashing      |
| Axios            | API Communication     |
| Google Gemini AI | Programming Responses |
| Vercel           | Frontend Hosting      |
| Render           | Backend Hosting       |

## Project Structure

```
Programming-Helper-Chatbot/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### 1. Clone the Repository

```
git clone https://github.com/MrRobotXOR/Programming-Helper-Chatbot.git
```

### 2. Install Backend Dependencies

```
cd server
npm install
```

### 3. Install Frontend Dependencies

```
cd ../client
npm install
```

### 4. Configure Environment Variables

**Server (.env)**

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

**Client (.env)**

```
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the Project

**Backend**

```
cd server
npm run dev
```

**Frontend**

```
cd client
npm run dev
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |

### Chat

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | /api/chat         | Generate AI Response |
| GET    | /api/chat/history | Fetch Chat History   |
| DELETE | /api/chat/:id     | Delete Chat          |

## Security Features

* JWT Authentication
* Password Hashing using Bcrypt
* Protected API Routes
* CORS Configuration
* Environment Variable Protection

## Deployment

The project is deployed using:

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

## Future Improvements

* Chat Export as PDF
* Voice Input Support
* Theme Switcher
* Code Copy Button
* AI Typing Animation
* Chat Search
* Profile Management


