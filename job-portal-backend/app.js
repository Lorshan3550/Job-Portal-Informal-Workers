import express from "express";
import dbConnection  from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js"
import applicationRouter from "./routes/applicationRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import fileRouter from "./routes/fileRoutes.js"
import dotenv from 'dotenv'
// import { config } from "dotenv";
import cors from "cors";
import ErrorHandler, { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
import multer from "multer";
import axios from "axios";
import bodyParser from "body-parser";


dotenv.config({path: "./config/config.env"})


// Create express server 
const app = express();
// config({ path: "./config/config.env" });


app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );



app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/files", fileRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/review", reviewRouter);


dbConnection();

app.use(errorMiddleware);

app.get("/error", (req, res, next) => {
  next(new ErrorHandler("Test error"));
});


export default app;
