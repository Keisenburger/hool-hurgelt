import { Request, Response } from "express";
import { Food } from "../../models/index.js";

export const updateFood = async (req: Request, res: Response) => {
  try {
    const id = req.params.foodId;
    const { foodName, price, image, ingredients, category } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      {
        foodName: foodName,
        price: price,
        image: image,
        ingredients: ingredients,
        category: category,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("category");

    if (!updatedFood) {
      console.error("Error finding food");
      res.status(404).json({ success: false, error: "Failed to find food" });
    }

    res.json({
      success: true,
      updatedData: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(400).json({ success: false, error: "Failed to update food" });
  }
};
