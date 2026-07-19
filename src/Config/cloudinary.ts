// src/Config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

// Cloudinary automatically detects and uses CLOUDINARY_URL from process.env
// .env is already loaded in server.ts, so no dotenv.config() call needed here

export default cloudinary;