import mongoose from "mongoose";
const { Schema, model } = mongoose;

const foodCategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

export const FoodCategory = model("FoodCategory", foodCategorySchema);
