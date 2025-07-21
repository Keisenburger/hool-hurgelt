import express from "express";
import {
  createFoodOrder,
  getAllFoodOrders,
  getFoodOrderById,
  updateFoodOrder,
  deleteFoodOrder,
} from "../controllers/food-order-controllers/index.js";

export const foodOrderRouter = express.Router();

foodOrderRouter.post("/", createFoodOrder);
foodOrderRouter.get("/", getAllFoodOrders);
foodOrderRouter.get("/:foodOrderId", getFoodOrderById);
foodOrderRouter.patch("/:foodOrderId", updateFoodOrder);
foodOrderRouter.delete("/:foodOrderId", deleteFoodOrder);
