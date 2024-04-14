"use client";
import jwtService from "@/lib/jwt";
import { isJwtExpired } from "@/lib/jwt/decode";
import { UserProfile } from "@/types/auth";
import { useRouter } from "next/navigation";
import {
    FC,
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLanguage } from "./LanguageContext";

interface AuthContext {
    userProfile?: UserProfile;
    logout: () => void;
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
    logout: () => {},
    isAuth: false,
    setIsAuth: () => {},
});

export const useAuthContext = (): AuthContext => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return useContext(AuthContext);
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    async function handleLogin() {
        const token = jwtService.getAccessToken();
        try {
            const ok = isJwtExpired();
            if (ok) {
                throw new Error("Token expired");
            }
            setIsAuth(true);
        } catch (error) {
            console.error(error);
            jwtService.removeJwt();
            router.push(getHref("/auth/login"));
        }
    }
    const logout = () => {
        jwtService.removeJwt();
        setIsAuth(false);
        window.location.href = getHref("/auth/login");
    };

    const { getHref } = useLanguage();

    useEffect(() => {
        handleLogin();
    }, []);
    if (!isAuth) {
        return <></>;
    }
    return (
        <AuthContext.Provider value={{ isAuth, logout, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
