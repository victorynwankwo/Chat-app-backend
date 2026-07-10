// server.ts
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/Config/db.js";

dotenv.config();

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.5:3000"], // Add your phone's frontend IP here!
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(` Real-time chat user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    httpServer.listen(PORT, () => {
      console.log(` Server and WebSockets running on port : ${PORT}`);
    });
  } catch (error) {
    console.error(" RUNTIME ERROR: Server startup aborting:", error);
    process.exit(1);
  }
};

startServer();
