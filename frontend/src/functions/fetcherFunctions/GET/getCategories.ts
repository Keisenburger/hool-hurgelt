import { Category } from "@/types";
import { baseUrl } from "@/utils/baseUrl";
import { SetStateAction } from "react";

export const fetchCategories = async (setCategories: {
  (value: SetStateAction<Category[]>): void;
  (arg0: any): void;
}) => {
  try {
    const response = await fetch(`${baseUrl}food-category`);
    const responseData = await response.json();
    setCategories(responseData.data);
  } catch (error) {
    console.log(error);
  }
};
