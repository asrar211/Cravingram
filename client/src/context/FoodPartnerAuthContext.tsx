import { createContext, useEffect, useState } from "react";
import type { FoodPartner, FoodPartnerAuthContextType } from "../types/FoodPartnerAuth";
import { api } from "../utils/api";

export const FoodPartnerAuthContext = createContext<FoodPartnerAuthContextType | undefined>(undefined);

export const FoodPartnerAuthProvider = ({children}: {children: React.ReactNode}) => {
    const [foodPartner, setFoodPartner] = useState<FoodPartner | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const checkFoodPartner =async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get("/auth/food-partner/me");
                setFoodPartner(res.data.foodPartner);
            } catch {
                setFoodPartner(null);
            } finally {
                setLoading(false);
            }
        };
        checkFoodPartner();
    }, []);

    
    const signup =async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            setSuccess(null);
            setError(null);

            const res = await api.post("/auth/food-partner/register", {
                name,
                email,
                password
            });

            setFoodPartner(res.data.foodPartner);
            setSuccess(res.data.message);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    
    const login =async (email: string, password: string) => {
        try {
            setLoading(true);
            setSuccess(null)
            setError(null);

            const res = await api.post("/auth/food-partner/login", {
                email,
                password
            });

            setFoodPartner(res.data.foodPartner);
            setSuccess(res.data.message);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const logout =async () => {
        try {
            await api.get("/auth/food-partner/logout");
            setFoodPartner(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };


    return (
        <FoodPartnerAuthContext.Provider
        value={{
            foodPartner,
            loading,
            success,
            error,
            signup,
            login,
            logout
        }}
        >
            {children}
        </FoodPartnerAuthContext.Provider>
    )
};