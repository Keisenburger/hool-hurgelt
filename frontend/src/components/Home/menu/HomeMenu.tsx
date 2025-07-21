import { fetchCategories, fetchFoods } from "@/functions/fetcherFunctions/GET";
import { Category, Food } from "@/types";
import { useEffect, useState } from "react";
import { HomeFoodCard } from "./HomeFoodCard";

export const HomeMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetchCategories(setCategories);
    fetchFoods(setFoods);
  }, []);

  return (
    <div className="flex flex-col gap-[54px] ">
      {categories.map((category, index) => {
        return (
          <div className="container flex flex-col gap-[54px]" key={index}>
            <h2 className="font-semibold text-3xl text-[#FFFFFF]">
              {category.categoryName}
            </h2>
            <div className="grid grid-cols-3 gap-9">
              {foods &&
                foods
                  .filter(
                    (food) =>
                      food?.category?.categoryName === category.categoryName
                  )
                  .map((food, index) => {
                    return (
                      <HomeFoodCard food={food} key={index}></HomeFoodCard>
                    );
                  })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
