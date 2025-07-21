import { baseUrl } from "@/utils/baseUrl";

export const patchCategory = async (id: string, categoryName: string) => {
  try {
    console.log(id);
    const response = await fetch(`${baseUrl}food-category/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};
