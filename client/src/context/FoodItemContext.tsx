import { createContext, useEffect, useState } from "react";
import type { FoodItem, FoodItemContextType } from "../types/FoodItem";
import { api } from "../utils/api";
import { useUserAuth } from "../hooks/useUserAuth";

export const FoodItemContext = createContext<FoodItemContextType | undefined>(undefined);

export const FoodItemProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserAuth();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/food/reel");
      setFoodItems(response.data.foodItems);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);


  const addFoodItem = async (name: string, description: string, video: File) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("video", video);

      const response = await api.post("/food/reel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFoodItems((prev) => [...prev, response.data.foodItem]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload food item");
    } finally {
      setLoading(false);
    }
  };

  const getFoodItemsByPartner = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/food/reel/food-partner");
      return response.data.foodItems;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch food items");
    } finally {
      setLoading(false);
    }
  };

const likeReel = async (id: string) => {
  if (!user) return;
  
  try {
    setLoading(true);
    setError(null);

    const res = await api.post(`/food/reel/${id}/like`);
    const didLike = res.data.liked;

    setFoodItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              likes: didLike
                ? [...(item.likes || []), user._id]
                : (item.likes || []).filter((uid) => uid !== user._id),
            }
          : item
      )
    );
  } catch (err: any) {
    setError(err.response?.data?.message || "Failed to like reel");
  } finally {
    setLoading(false);
  }
};


  return (
    <FoodItemContext.Provider
      value={{
        foodItems,
        loading,
        error,
        fetchFoodItems,
        addFoodItem,
        getFoodItemsByPartner,
        likeReel,
      }}
    >
      {children}
    </FoodItemContext.Provider>
  );
};
