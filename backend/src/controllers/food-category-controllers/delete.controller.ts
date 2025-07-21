import { Request, Response } from "express";
import { FoodCategory } from "../../models/index.js";

export const deleteFoodCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodCategoryId;
    const deletedCategory = await FoodCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      console.error("Error finding category");
      res
        .status(404)
        .json({ success: false, error: "Failed to find category" });
    }
    res.json({
      success: true,
      deletedCategory: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(400)
      .json({ success: false, error: "Failed to delete category" });
  }
};
