import mongoose, { Types } from "mongoose";
const { Schema, model } = mongoose;
const foodOrderItemsSchema = new Schema({
  foodId: {
    type: Types.ObjectId,
    required: true,
    ref: "Food",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const FoodOrderItem = model("FoodOrderItem", foodOrderItemsSchema);
