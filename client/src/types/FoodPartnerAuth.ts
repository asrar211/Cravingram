
export interface FoodPartner {
    _id: string;
    name: string;
    email: string;
}

export interface FoodPartnerAuthContextType {
    foodPartner: FoodPartner | null;
    loading: boolean;
    success: string | null;
    error: string | null;
    signup: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getFoodPartner: () => Promise<FoodPartner | null>;
}