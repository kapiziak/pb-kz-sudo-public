"use client";

import { ReactNode, useEffect } from "react";
import useTheme from "@/src/hooks/ui/useTheme";

interface ThemeWrapperProps {
    children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
    const { theme } = useTheme();

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else if (theme === "light") {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    return <>{children}</>;
}
