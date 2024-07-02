import "./[lang]/globals.css";
import { locales } from "@/src/application/lang/locales";
import { ServerWrapper } from "@/src/application/wrappers/ServerWrapper/ServerWrapper";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <ServerWrapper>{children}</ServerWrapper>
            </body>
        </html>
    );
}
