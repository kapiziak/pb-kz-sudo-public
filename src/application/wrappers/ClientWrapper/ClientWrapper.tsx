"use client";

import useApiPing from "@/src/api/hooks/api-general";
import { useCurrentUserInfo } from "@/src/api/hooks/auth/me";
import { TLocale } from "@/src/application/lang/locales";
import {
    appSelectSidebarCollapsed,
    appSetLanguage,
    appSetSidebarCollapsed,
} from "@/src/application/store/reducers/appSlice";
import { store } from "@/src/application/store/store";
import { ThemeWrapper } from "@/src/application/wrappers/ClientWrapper/ThemeWrapper";
import { Toaster } from "@/src/components/ui/toaster";
import { useWindowSize } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider, useDispatch, useSelector } from "react-redux";
import useAppRouter from "../../routing/useAppRouter";

interface ClientWrapperProps {
    children: ReactNode;
    lang: TLocale;
}

const queryClient = new QueryClient();

export function ClientWrapper(props: ClientWrapperProps) {
    const { children, lang } = props;

    return (
        <QueryClientProvider client={queryClient} contextSharing={true}>
            <Provider store={store}>
                <AppWrapper {...props}>
                    <ThemeWrapper>{children}</ThemeWrapper>
                    <ReactQueryDevtools />
                    <Toaster />
                </AppWrapper>
            </Provider>
        </QueryClientProvider>
    );
}

function AppWrapper({ children, lang }: ClientWrapperProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const appRouter = useAppRouter();

    const { data } = useApiPing();
    const { data: userData, isSuccess, error } = useCurrentUserInfo();

    const size = useWindowSize();

    const isSidebarCollapsed = useSelector(appSelectSidebarCollapsed);

    useEffect(() => {
        if (!size?.width) return;

        if (size.width < 768 && !isSidebarCollapsed) {
            dispatch(appSetSidebarCollapsed(true));
        } else if (size.width >= 768 && isSidebarCollapsed) {
            dispatch(appSetSidebarCollapsed(false));
        }
        // Disabled due to isSidebarCollapsed dependency
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, size]);

    useEffect(() => {
        if (error) {
            if (process.env.NEXT_PUBLIC_DISABLE_SSR_LOGIN_REDIRECT === "1") {
                router.push(appRouter.loginIn());
            }
        }
    }, [appRouter, router, error]);

    useEffect(() => {
        if (isSuccess) console.log("User Data => ", userData);
    }, [isSuccess, userData]);

    useEffect(() => {
        dispatch(appSetLanguage(lang));
    }, [dispatch, lang]);

    return <>{children}</>;
}
