import { createContext, useEffect, useState } from "react";
import type { User, UserAuthContextType } from "../types/UserAuth";
import { api } from "../utils/api";

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
            setLoading(true);
            setError(null);
            
            const res = await api.get("/auth/user/me");
            setUser(res.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
        };
        checkUser();
    }, []);

    
    const signup =async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            setSuccess(null);
            setError(null);

            const res = await api.post("/auth/user/register", {
                name,
                email,
                password
            });
            
            setUser(res.data.user);
            setSuccess(res.data.message);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const login =async (email: string, password: string) => {
        try {
            setLoading(true);
            setSuccess(null);
            setError(null);

            const res = await api.post("/auth/user/login",{
                email,
                password
            });

            setUser(res.data.user);
            setSuccess(res.data.message);
            return res.data.user;
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    
    const logout =async () => {
        try {
            await api.get("/auth/user/logout");
            setUser(null);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };



    return (
        <UserAuthContext.Provider
        value={{
            user,
            loading,
            success,
            error,
            signup,
            login,
            logout,
        }}
        >
            {children}
        </UserAuthContext.Provider>
    )
};