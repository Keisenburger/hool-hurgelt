import express from "express";
import {
  getFoodById,
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
} from "../controllers/food-controllers/index.js";
// import verifyToken from "../middlewares/authMiddleware.js";

export const foodsRouter = express.Router();

foodsRouter.get("/", getAllFoods);
foodsRouter.get("/:foodId", getFoodById);
foodsRouter.post("/", createFood);
foodsRouter.patch("/:foodId", updateFood);
foodsRouter.delete("/:foodId", deleteFood);
