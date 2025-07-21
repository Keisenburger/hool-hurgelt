import { Order } from "@/types";
import { baseUrl } from "@/utils/baseUrl";
import { SetStateAction } from "react";

export const fetchOrders = async (setOrders: {
  (value: SetStateAction<Order[]>): void;
  (arg0: any): void;
}) => {
  try {
    const response = await fetch(`${baseUrl}food-order`);
    const responseData = await response.json();
    setOrders(responseData.data);
  } catch (error) {
    console.log(error);
  }
};
