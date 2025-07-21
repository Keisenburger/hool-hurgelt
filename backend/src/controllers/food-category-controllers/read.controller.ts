import { Request, Response } from "express";
import { FoodCategory } from "../../models/index.js";

export const getAllFoodCategories = async (req: Request, res: Response) => {
  try {
    const foodCategories = await FoodCategory.find();
    res.json({
      success: true,
      data: foodCategories,
    });
  } catch (error) {
    console.error("Error fetching categories", error);
    res
      .status(404)
      .json({ success: false, error: "Failed to fetch categories" });
  }
};
