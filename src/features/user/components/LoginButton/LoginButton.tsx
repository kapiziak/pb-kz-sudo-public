import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import AppRouter from "@/src/application/routing/app-router";
import {
    appSelectLanguage,
    appSelectSidebarCollapsed,
} from "@/src/application/store/reducers/appSlice";
import IconButton from "@/src/components/ui/icon-button";
import useUser from "@/src/features/user/hooks/useUser";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

interface LoginButtonProps {
    gap?: number;
}

const LoginButton = ({ gap = 3 }: LoginButtonProps) => {
    const { isLoggedIn, username } = useUser();
    const lang = useSelector(appSelectLanguage);
    const isCollapsed = useSelector(appSelectSidebarCollapsed);

    const appRouter = new AppRouter(lang);
    const loginUrl = appRouter.loginIn();

    const textTranslation = useTranslation({
        lang,
        name: "features.user.loginButton.text",
    });

    return (
        // <Flex gap={gap} justifyContent={"center"} alignItems={"center"}>
        <div className={`flex gap-${gap} justify-center align-center`}>
            {/* TODO: Translate it */}
            {!isLoggedIn ? (
                <Link href={loginUrl}>
                    <IconButton icon={<KeyRound />}>
                        {textTranslation}
                    </IconButton>
                </Link>
            ) : username && !isCollapsed ? (
                <div>
                    <Translation
                        name="features.user.loginButton.welcomeMsg"
                        variables={[username]}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default LoginButton;
