"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
    const token = useSelector((state) => state.auth.token);
    const router = useRouter();

    if (!token) {
        // Redirect to login page if not authenticated
        router.replace("/login");
        return null; // Prevent rendering protected content
    }

    return <>{children}</>;
}
