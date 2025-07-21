"use client";
import { Food } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { HomeFoodModal } from "../modal/HomeFoodModal";

export const HomeFoodCard = ({ food }: { food: Food }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 rounded-[20px] border border-[#E4E4E7] flex flex-col gap-5 bg-white">
      <div
        className="w-full h-[210px] bg-center bg-cover rounded-xl p-5 flex justify-end items-end"
        style={{ backgroundImage: `url(${food.image})` }}
      >
        <div
          className="bg-white rounded-full p-4 text-red-500 hover:bg-[#E4E4E7] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus></Plus>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold text-red-500">{food.foodName}</p>
          <p className="text-[#09090B] text-lg font-semibold">${food.price}</p>
        </div>
        <p className="text-sm text-[#09090B]">{food.ingredients}</p>
      </div>
      {isModalOpen && (
        <HomeFoodModal food={food} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default HomeFoodCard;
