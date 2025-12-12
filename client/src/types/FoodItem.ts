export interface FoodItem {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  videoId: string;
  foodPartner: {
    _id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
  likes: string[];
}

export interface FoodItemContextType {
  foodItems: FoodItem[];
  loading: boolean;
  error: string | null;
  fetchFoodItems: () => Promise<void>;
  addFoodItem: (name: string, description: string, video: File) => Promise<void>;
  getFoodItemsByPartner: () => Promise<void>;
  likeReel: (id: string) => Promise<void>;
}
