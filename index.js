import express from "express";
import dotenv from "dotenv";
import { DataBaseConnection } from "./config/databaseConnection.js";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import indexRoute from "./route/index.route.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://client-zepto.vercel.app","https://client-grocery.vercel.app"],
    credentials: true,
  })
);

app.use(morgan('tiny'));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use("/api", indexRoute);

const port = process.env.PORT || 9000;

// ✅ Start server only after DB connection
const startServer = async () => {
  try {
    await DataBaseConnection();
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();