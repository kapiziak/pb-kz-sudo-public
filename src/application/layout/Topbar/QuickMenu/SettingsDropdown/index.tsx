import Translation from "@/src/application/lang/client/Translation";
import { TLocale } from "@/src/application/lang/locales";
import AppRouter from "@/src/application/routing/app-router";
import useAppRouter from "@/src/application/routing/useAppRouter";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import IconButton from "@/src/components/ui/icon-button";
import { Cog } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function SettingsDropdown() {
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    const router = useRouter();
    const pathname = usePathname();

    const lang = useSelector(appSelectLanguage);

    const appRouter = useAppRouter();

    useEffect(() => {
        setIsAvailable(true);
    }, []);

    if (!isAvailable) return null;

    const prepareLanguageUrl = (locale: TLocale) =>
        pathname.replace(`/${lang}`, `/${locale}`);

    function handleLogout() {
        router.push(new AppRouter(lang).logout());
    }

    return (
        <div data-testid="settings-dropdown">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <IconButton icon={<Cog />}></IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        <Translation name="appTopbar.quickMenu.heading" />
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link href={appRouter.settings("profile")}>
                                <span>
                                    <Translation name="appTopbar.quickMenu.profile" />
                                </span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <span>
                                    <Translation name="appTopbar.quickMenu.language" />
                                </span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href={prepareLanguageUrl("pl")}>
                                            🇵🇱 PL
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        asChild
                                    >
                                        <Link href={prepareLanguageUrl("en")}>
                                            🇺🇸 ENG
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <span>
                            <Translation name="appTopbar.quickMenu.logout" />
                        </span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
