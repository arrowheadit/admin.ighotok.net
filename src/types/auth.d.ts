import type { LoginFormValues } from "@/schema";

interface AuthUser {
    name: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (userData: LoginFormValues) => void;
    logout: () => void;
    token: string | null;
    isLoading: boolean;
}
