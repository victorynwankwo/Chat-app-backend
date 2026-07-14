# Chat App Backend

A real-time chat backend built with Express, TypeScript, MongoDB, and Socket.IO. It supports user authentication, room creation, message posting, and Swagger API documentation.

## Key features

- JWT authentication for users
- Room creation with participant membership
- Message sending and fetching per room
- WebSocket support via Socket.IO
- API docs available through Swagger UI

## Tech stack

- Node.js with ES modules
- TypeScript
- Express
- MongoDB / Mongoose
- Socket.IO
- Swagger (swagger-jsdoc + swagger-ui-express)

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the app

### Development

```bash
npm run dev
```

This runs `tsx watch server.ts` and restarts on file changes.

### Production build

```bash
npm run build
npm start
```

## Project structure

- `server.ts` - application entry point, HTTP server, Socket.IO config, DB connection
- `src/app.ts` - Express app setup, JSON parsing, Swagger, and route mounting
- `src/Config/db.ts` - MongoDB connection logic
- `src/Config/swagger.ts` - Swagger definition and JSDoc scan paths
- `src/Controllers/` - request handlers for auth, rooms, and messages
- `src/Routes/` - Express route definitions
- `src/Middleware/verifyUser.ts` - JWT validation and user injection
- `src/Model/` - Mongoose models for `User`, `Room`, and `Message`

## Routes overview

### Authentication

- `POST /auth/register` - register a new user with `username` and `password`
- `POST /auth/login` - login with `username` and `password`, returns an access token

### Rooms

- `POST /rooms/createroom` - create a room by passing `participants` array
- `GET /rooms/myrooms` - get rooms where the authenticated user participates
- `GET /rooms/{roomId}` - get details for a specific room

### Messages

- `POST /message/{roomId}/messages` - send a message to a room using `text`
- `GET /message/{roomId}/messages` - fetch all messages for a room

## Swagger API docs

