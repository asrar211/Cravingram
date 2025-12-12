import { useContext } from "react"
import { FoodPartnerAuthContext } from "../context/FoodPartnerAuthContext"
import type { FoodPartnerAuthContextType } from "../types/FoodPartnerAuth";

export const useFoodPartnerAuth = (): FoodPartnerAuthContextType => {
    const context = useContext(FoodPartnerAuthContext);
    if(!context) throw new Error("useFoodPartnerAuth must be used inside <FoodPartnerAuthProvider>");
    return context;
}