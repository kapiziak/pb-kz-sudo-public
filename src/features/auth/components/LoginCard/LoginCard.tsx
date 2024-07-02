import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { getLangDictionary } from "@/src/application/lang/dictonaries";
import { TLocale } from "@/src/application/lang/locales";
import { LoginForm } from "@/src/features/auth/components/LoginCard/Form";

interface LoginCardProps {
    lang: TLocale;
}

export default async function LoginCard({ lang }: LoginCardProps) {
    const langDict = await getLangDictionary(lang);

    return (
        <Card className={"min-w-full lg:min-w-[30%]"}>
            <CardHeader>
                <CardTitle>{langDict.loginPage.title}</CardTitle>
                <CardDescription>{langDict.loginPage.subtitle}</CardDescription>
            </CardHeader>

            <LoginForm translations={langDict.loginPage.form} />
        </Card>
    );
}
