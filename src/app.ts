import express from "express";
import authRoutes from "./Routes/authRoute.js";
import roomRoute from "./Routes/roomRoute.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// authentication routes
app.use("/auth", authRoutes);
// room routes
app.use("/rooms", roomRoute);  

export default app;
