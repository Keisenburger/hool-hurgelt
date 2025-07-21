import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  foodsRouter,
  foodCategoryRouter,
  authRouter,
  foodOrderRouter,
} from "./routes/index.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI as any);

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.use("/food", foodsRouter);
server.use("/food-category", foodCategoryRouter);
server.use("/auth", authRouter);
server.use("/food-order", foodOrderRouter);

server.get("/", (_req, res) => {
  res.send("Hello");
});

server.listen(port, () => {
  console.log("server asla");
});
