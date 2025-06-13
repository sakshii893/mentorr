# MentorR - Mentorship Platform

A full-stack mentorship platform built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication (Register/Login)
- Role-based access control (Admin/User)
- Admin dashboard for user management
- User dashboard for profile management
- Secure API endpoints
- JWT authentication
- Responsive design

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mentorr
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mentorr
JWT_SECRET=your_jwt_secret
```

4. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### User
- GET /api/users/profile - Get user profile
- PATCH /api/users/profile - Update user profile

### Admin
- GET /api/admin/profile - Get admin profile
- GET /api/admin/users - Get all users
- DELETE /api/admin/users/:id - Delete user
- PATCH /api/admin/users/:id/role - Update user role

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 