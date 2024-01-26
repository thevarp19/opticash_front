import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children?: ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
