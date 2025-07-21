import { NewFood } from "@/types";
import { baseUrl } from "@/utils/baseUrl";

export const postFood = async (food: NewFood) => {
  try {
    const response = await fetch(`${baseUrl}food`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Successfully posted:", data);
    return data;
  } catch (error) {
    console.error("Error posting food:", error);
  }
};
