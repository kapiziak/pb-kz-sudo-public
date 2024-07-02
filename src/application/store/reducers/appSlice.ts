import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/src/application/store/store";
import GeneralConfig from "@/src/application/config/general";
import { TLocale } from "@/src/application/lang/locales";

export interface AppState {
    isSidebarCollapsed: boolean;
    theme: "light" | "dark" | null;
    language: TLocale;
}

const initialState: AppState = {
    isSidebarCollapsed: false,
    theme:
        typeof localStorage !== "undefined"
            ? (localStorage.getItem("theme") as "light" | "dark") ?? null
            : null,
    language: "en",
};

export const appSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload;
        },
        toggleSidebar: (state) => {
            state.isSidebarCollapsed = !state.isSidebarCollapsed;
        },
        setTheme: (state, action: PayloadAction<AppState["theme"]>) => {
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        setLanguage: (state, action: PayloadAction<AppState["language"]>) => {
            state.language = action.payload;
        },
    },
});

export const appSelectSidebarCollapsed = (state: RootState) =>
    state.appSlice.isSidebarCollapsed;

export const appSelectTheme = (state: RootState) => state.appSlice.theme;
export const appSelectLanguage = (state: RootState) => state.appSlice.language;

// export const quickSelectQuickList = (state: RootState) => state.quickList.list;

// Action creators are generated for each case reducer function
export const {
    setSidebarCollapsed: appSetSidebarCollapsed,
    setTheme: appSetTheme,
    toggleTheme: appToggleTheme,
    toggleSidebar: appToggleSidebar,
    setLanguage: appSetLanguage,
} = appSlice.actions;

export default appSlice.reducer;
