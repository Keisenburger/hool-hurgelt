import { Request, Response } from "express";
import { FoodCategory } from "../../models/index.js";

export const updateFoodCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    const id = req.params.foodCategoryId;
    const updatedCategory = await FoodCategory.findByIdAndUpdate(
      id,
      {
        categoryName: categoryName,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!updatedCategory) {
      console.error("Error fetching category");
      res
        .status(404)
        .json({ success: false, error: "Failed to fetch category" });
    }
    res.json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category");
    res
      .status(400)
      .json({ success: false, error: "Failed to update category" });
  }
};
