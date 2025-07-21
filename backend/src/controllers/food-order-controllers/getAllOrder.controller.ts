import { Request, Response } from "express";
import { FoodOrder } from "../../models/index.js";

export const getAllFoodOrders = async (_req: Request, res: Response) => {
  try {
    const foodOrders = await FoodOrder.find().populate([
      {
        path: "foodOrderItems",
        populate: {
          path: "category",
        },
      },
      { path: "user" },
    ]);

    res.json({
      success: true,
      data: foodOrders,
    });
  } catch (error) {
    console.error("Error fetching food orders:", error);
    res.status(404).json({
      success: false,
      error: "Failed to fetch food orders",
    });
  }
};
