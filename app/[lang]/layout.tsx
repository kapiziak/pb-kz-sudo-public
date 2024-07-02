import { TLangParam } from "@/src/application/types/langParam";
import { locales } from "@/src/application/lang/locales";
import { ClientWrapper } from "@/src/application/wrappers/ClientWrapper/ClientWrapper";
import { ServerWrapper } from "@/src/application/wrappers/ServerWrapper/ServerWrapper";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
} & TLangParam) {
    return (
        <html lang={params.lang}>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <ServerWrapper>
                    <ClientWrapper lang={params.lang}>{children}</ClientWrapper>
                </ServerWrapper>
            </body>
        </html>
    );
}
