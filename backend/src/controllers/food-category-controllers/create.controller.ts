import { Request, Response } from "express";
import { FoodCategory } from "../../models/index.js";

export const createFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    const createdCategory = await FoodCategory.create({
      categoryName: categoryName,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      data: createdCategory,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res
      .status(400)
      .json({ success: false, error: "Failed to create category" });
  }
};
