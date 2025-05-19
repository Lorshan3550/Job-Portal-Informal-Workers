import express from "express";
import dbConnection  from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js"
import applicationRouter from "./routes/applicationRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import fileRouter from "./routes/fileRoutes.js"
import notificationRouter from "./routes/notificationRoutes.js"
import dotenv from 'dotenv'
import cors from "cors";
import ErrorHandler, { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import axios from "axios";
import bodyParser from "body-parser";


dotenv.config({path: "./config/config.env"})

// Create express server 
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_2], 
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use

console.log("Allowed Origins:", process.env.FRONTEND_URL, process.env.FRONTEND_URL_2);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/notification", notificationRouter);


dbConnection();

app.use(errorMiddleware);

app.get("/error", (req, res, next) => {
  next(new ErrorHandler("Test error"));
});


export default app;
