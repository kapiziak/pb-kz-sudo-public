import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { locales } from "@/src/application/lang/locales";
import { TLangParam } from "@/src/application/types/langParam";
import { ClientWrapper } from "@/src/application/wrappers/ClientWrapper/ClientWrapper";
import LoginCard from "@/src/features/auth/components/LoginCard/LoginCard";
import { Lock } from "lucide-react";

export async function generateStaticParams() {
    return locales.map((x) => ({ lang: x }));
}

export default async function LoginPage({ params: { lang } }: TLangParam) {
    const loginCard = await LoginCard({ lang });
    const dict = await getLangDictionary(lang);

    return (
        <ClientWrapper lang={lang}>
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly w-screen h-screen px-4">
                <div className="flex flex-col mb-6 lg:mb-0">
                    <div className="flex items-center gap-2">
                        <Lock />
                        <h1 className="text-4xl font-bold text-center">
                            {dict.loginPage.hero.title}
                        </h1>
                    </div>
                    <h2>
                        {dict.loginPage.hero.desc}{" "}
                        <strong>{dict.loginPage.hero.nowText}</strong>
                    </h2>
                </div>
                {loginCard}
            </div>
        </ClientWrapper>
    );
}
