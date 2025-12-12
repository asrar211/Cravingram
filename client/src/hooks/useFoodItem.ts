import { useContext } from "react";
import { FoodItemContext } from "../context/FoodItemContext";

export const useFoodItem = () => {
  const context = useContext(FoodItemContext);
  if (!context) {
    throw new Error("useFoodItem must be used inside a FoodItemProvider");
  }
  return context;
};
