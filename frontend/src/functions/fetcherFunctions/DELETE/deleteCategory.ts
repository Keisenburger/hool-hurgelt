import { baseUrl } from "@/utils/baseUrl";

export const deleteCategory = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}food-category/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
