import { Request, Response } from "express";
import { FoodOrder } from "../../models/index.js";

export const createFoodOrder = async (req: Request, res: Response) => {
  try {
    const { foods, totalPrice, status, userId } = req.body;
    const newFoodOrder = await FoodOrder.create({
      user: userId,
      totalPrice: totalPrice,
      foodOrderItems: [{ foodIds: foods.foodId, quantity: foods.quantity }],
      status: status,
      createdAt: new Date(),
    });

    res.json({
      success: true,
      data: newFoodOrder,
    });
  } catch (error) {
    console.error("Error creating food order:", error);
    res.status(400).json({ success: false, error: error });
  }
};
