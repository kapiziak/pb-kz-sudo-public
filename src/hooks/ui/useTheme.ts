"use client";

import { useDispatch, useSelector } from "react-redux";
import {
    appSelectTheme,
    appSetTheme,
    appToggleTheme,
} from "@/src/application/store/reducers/appSlice";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";

const useTheme = () => {
    const [isPreferedDarkMode, setPreferedDarkMode] = useState<boolean>(false);

    const selectedTheme = useSelector(appSelectTheme);
    const dispatch = useDispatch();

    const theme = useMemo(
        () => selectedTheme ?? (isPreferedDarkMode ? "dark" : "light"),
        [selectedTheme, isPreferedDarkMode]
    );

    const setTheme = (theme: "dark" | "light") => {
        localStorage.setItem("theme", theme);
        dispatch(appSetTheme(theme));
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    useEffect(() => {
        const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

        const callback = (e: MediaQueryListEvent) =>
            setPreferedDarkMode(e.matches);

        matchMedia.addEventListener("change", callback);

        setPreferedDarkMode(matchMedia.matches);
        return () => {
            matchMedia.removeEventListener("change", callback);
        };
    }, []);

    return {
        theme,
        setTheme,
        toggleTheme,
    };
};

export default useTheme;
