
export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface UserAuthContextType {
    user: User | null;
    loading: boolean;
    success: string | null;
    error: string | null;
    signup: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}