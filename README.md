# Chat App Backend

A real-time chat backend built with Express, TypeScript, MongoDB, and Socket.IO. It supports user authentication, room management, message sending, and interactive API documentation.

## Features

- JWT-based authentication for users
- Room creation and participant-based room access
- Sending and fetching messages inside a room
- Real-time communication support with Socket.IO
- Interactive Swagger documentation for the API

## Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB with Mongoose
- Socket.IO
- Swagger UI and Swagger JSDoc

## Documentation

API docs: https://chat-app-backend-zyhh.onrender.com/api-docs/

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the App

### Development

```bash
npm run dev
```

This starts the app in development mode with hot reloading.

### Production Build

```bash
npm run build
npm start
```

## Main API Endpoints

### Authentication

- `POST /auth/register` - Register a new user with a username and password
- `POST /auth/login` - Log in and receive an access token

### Rooms

- `POST /rooms/createroom` - Create a room and define its participants
- `GET /rooms/myrooms` - Get all rooms for the authenticated user
- `GET /rooms/{roomId}` - Get details for a specific room

### Messages

- `POST /message/{roomId}/messages` - Send a message to a room
- `GET /message/{roomId}/messages` - Fetch messages for a room

## Project Structure

- `server.ts` - Application entry point and server startup
- `src/app.ts` - Express app setup, middleware, and route mounting
- `src/Config/` - Configuration for database, Swagger, and app settings
- `src/Controllers/` - Request handlers for auth, rooms, and messages
- `src/Routes/` - Express route definitions
- `src/Middleware/` - Authentication and request validation middleware
- `src/Model/` - Mongoose models for users, rooms, and messages

## Notes

Use the Swagger UI link above to test the API endpoints directly in your browser.
