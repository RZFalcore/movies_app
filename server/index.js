import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected.");
    server.listen(PORT, console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
