import express from "express";

import {
  getAllFoodCategories,
  updateFoodCategory,
  createFoodCategory,
  deleteFoodCategory,
} from "../controllers/food-category-controllers/index.js";

export const foodCategoryRouter = express.Router();

foodCategoryRouter.get("/", getAllFoodCategories);
foodCategoryRouter.post("/", createFoodCategory);
foodCategoryRouter.patch("/:foodCategoryId", updateFoodCategory);
foodCategoryRouter.delete("/:foodCategoryId", deleteFoodCategory);
