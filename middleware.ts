import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "pl"];
const noAuthPages = ["/login", "/logout"];

function getLocale(request: NextRequest) {
    let headers = {
        "accept-language": request.headers.get("accept-language") || "",
    };
    let languages = new Negotiator({ headers }).languages();
    const defaultLocale = "en";

    return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: NextRequest) {
    const cookieStore = request.cookies;
    let redirectTo = null;

    if (process.env.NEXT_PUBLIC_DISABLE_SSR_LOGIN_REDIRECT !== "1") {
        if (
            noAuthPages.findIndex((x) =>
                request.nextUrl.pathname.includes(x)
            ) !== -1
        ) {
            return;
        } else {
            if (!cookieStore.get("authToken")) {
                redirectTo = "/login";
            }
        }
    }

    // console.log(request.headers);
    // Check if there is any supported locale in the pathname
    const pathname = redirectTo ?? request.nextUrl.pathname;
    const pathnameIsMissingLocale = locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale && !pathname.startsWith("/assets/")) {
        const locale = getLocale(request);

        // e.g. incoming request is /products
        // The new URL is now /en-US/products
        return NextResponse.redirect(
            new URL(`/${locale}/${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        "/((?!_next).*)",
        // Optional: only run on root (/) URL
        // "/",
    ],
};
