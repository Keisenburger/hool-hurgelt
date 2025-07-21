import { Request, Response } from "express";
import { Food } from "../../models/index.js";

export const createFood = async (req: Request, res: Response) => {
  const { foodName, price, image, ingredients, categoryId } = req.body;

  try {
    const createdFood = await Food.create({
      foodName: foodName,
      price: price,
      image: image,
      category: categoryId,
      ingredients: ingredients,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      data: createdFood,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(400).json({ success: false, error: "Failed to create food" });
  }
};
