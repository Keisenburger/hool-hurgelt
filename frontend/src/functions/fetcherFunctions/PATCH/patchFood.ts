import { Food } from "@/types";
import { baseUrl } from "@/utils/baseUrl";

export const patchFood = async (foodId: string, food: Food) => {
  try {
    console.log(food);

    const data = {
      foodName: food.foodName,
      price: food.price,
      ingredients: food.ingredients,
      image: food.image,
      category: food.category._id,
    };

    const response = await fetch(`${baseUrl}food/${foodId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return "Success";
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
};
