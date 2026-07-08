import dotenv from "dotenv";
import app from "./src/app";


dotenv.config();

const startServer = async () => {
  try {
    // 1. Connect database first before launching port listener
  

    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
      console.log(` Server running on port : ${PORT}`);
    });
  } catch (error) {
    console.error(" RUNTIME ERROR: Server startup aborting:", error);
    process.exit(1);
  }
};

startServer();

