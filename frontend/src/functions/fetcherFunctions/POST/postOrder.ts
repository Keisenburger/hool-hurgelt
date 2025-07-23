import { Order } from "@/types";
import { baseUrl } from "@/utils/baseUrl";

export const postOrder = async (order: Order) => {
  try {
    const response = await fetch(`${baseUrl}order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Successfully posted:", data);
    return data;
  } catch (error) {
    console.error("Error posting order:", error);
  }
};
