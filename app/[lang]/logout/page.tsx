"use client";
import { TLangParam } from "@/src/application/types/langParam";
import AuthService from "@/src/api/services/auth-service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthLogout } from "@/src/api/hooks/auth/logout";
import AppRouter from "@/src/application/routing/app-router";
import { locales } from "@/src/application/lang/locales";

const authService = new AuthService();

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default function LogoutPage({ params }: TLangParam) {
    const { push } = useRouter();

    const { mutate: logoutMutate } = useAuthLogout();

    useEffect(() => {
        async function processLogout() {
            logoutMutate(
                {},
                {
                    onSuccess: () => {
                        push(new AppRouter(params.lang).loginIn());
                    },
                }
            );
        }

        processLogout();
    }, [logoutMutate, params, push]);

    return <>Logout in progress...</>;
}
