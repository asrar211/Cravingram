import { useContext } from "react"
import { UserAuthContext } from "../context/UserAuthContext"
import type { UserAuthContextType } from "../types/UserAuth";

export const useUserAuth = (): UserAuthContextType => {
    const context = useContext(UserAuthContext);
    if(!context) throw new Error("useUserAuth must be used inside <UserAuthProvider>");
    return context; 
}