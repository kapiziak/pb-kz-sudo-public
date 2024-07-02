import LangDict from "@/dictionaries/dist/locale-dict-type";
import { useCurrentUserInfo } from "@/src/api/hooks/auth/me";
import { components } from "@/src/api/v1";
import useTranslation from "@/src/application/lang/client/useTranslation";
import MenuItem from "@/src/application/layout/Sidebar/Menu/MenuItem";
import AppRouter from "@/src/application/routing/app-router";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Accordion } from "@/src/components/ui/accordion";
import {
    Book,
    Fingerprint,
    Home,
    ShieldCheck,
    Users,
    Warehouse,
} from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";

interface Props {
    variant?: "mobile" | "desktop";
}

const SidebarMenu = ({ variant = "desktop" }: Props) => {
    const userData = useCurrentUserInfo();
    const userRole = useMemo(
        () =>
            userData?.data?.data?.data?.user?.role as
                | components["schemas"]["User"]["role"]
                | undefined,
        [userData]
    );

    const lang = useSelector(appSelectLanguage);

    const appRouter = new AppRouter(lang);

    const translationHome = useTranslation({
        lang,
        name: "appSidebar.menu.homepage",
    });
    const translationAuthorizations = useTranslation({
        lang,
        name: "appSidebar.menu.authorizations",
    });
    const translationFacilities = useTranslation({
        lang,
        name: "appSidebar.menu.facilities",
    });
    const translationUsers = useTranslation({
        lang,
        name: "appSidebar.menu.users",
    });

    const translationEntries = useTranslation({
        lang,
        name: "appSidebar.menu.entries",
    });

    const translationUsersSubMenu = useTranslation<
        LangDict["appSidebar"]["submenus"]["users"]
    >({
        lang,
        name: "appSidebar.submenus.users",
    });

    const translationFacilitiesSubMenu = useTranslation<
        LangDict["appSidebar"]["submenus"]["facilities"]
    >({
        lang,
        name: "appSidebar.submenus.facilities",
    });

    const translationAuthorizationsSubMenu = useTranslation<
        LangDict["appSidebar"]["submenus"]["authorizations"]
    >({
        lang,
        name: "appSidebar.submenus.authorizations",
    });

    const translationSuperIdSubMenu = useTranslation<
        LangDict["appSidebar"]["submenus"]["superId"]
    >({
        lang,
        name: "appSidebar.submenus.superId",
    });

    const menuItemsProps = {
        small: variant === "mobile",
    };

    return (
        <div className="flex ">
            <Accordion className="w-full" type={"single"} collapsible>
                <MenuItem
                    id={"home"}
                    label={translationHome}
                    icon={<Home />}
                    href={appRouter.home()}
                    {...menuItemsProps}
                />

                {userRole && ["ADMIN", "EMPLOYEE"].includes(userRole) ? (
                    <MenuItem
                        id="entries"
                        href={appRouter.entries()}
                        label={translationEntries}
                        icon={<Book />}
                        {...menuItemsProps}
                    />
                ) : null}

                <MenuItem
                    id="super-id"
                    href={appRouter.superId()}
                    label={"SuperID"}
                    icon={<Fingerprint />}
                    {...menuItemsProps}
                >
                    <MenuItem
                        id="super-id-home"
                        href={appRouter.superId("list")}
                        label={translationSuperIdSubMenu.manage}
                    />
                    {userRole && ["ADMIN", "EMPLOYEE"].includes(userRole) ? (
                        <MenuItem
                            id="super-id-scan"
                            href={appRouter.superId("scan")}
                            label={translationSuperIdSubMenu.scan}
                        />
                    ) : null}
                </MenuItem>
                <MenuItem
                    id={"access"}
                    href={appRouter.authorizations()}
                    label={translationAuthorizations}
                    icon={<ShieldCheck />}
                    {...menuItemsProps}
                >
                    <MenuItem
                        id="access-my"
                        href={appRouter.authorizations("my")}
                        label={translationAuthorizationsSubMenu.my}
                    />
                    {userRole && ["ADMIN", "EMPLOYEE"].includes(userRole) ? (
                        <>
                            <MenuItem
                                id="access-list"
                                href={appRouter.authorizations("list")}
                                label={translationAuthorizationsSubMenu.list}
                            />
                            <MenuItem
                                id="access-add"
                                href={appRouter.authorizations("add")}
                                label={translationAuthorizationsSubMenu.create}
                            />
                        </>
                    ) : null}
                </MenuItem>
                {userRole && ["ADMIN", "EMPLOYEE"].includes(userRole) ? (
                    <>
                        <MenuItem
                            id={"objects"}
                            href={appRouter.facilities()}
                            label={translationFacilities}
                            icon={<Warehouse />}
                            {...menuItemsProps}
                        >
                            <MenuItem
                                id="facility-all"
                                href={appRouter.facilities()}
                                label={translationFacilitiesSubMenu.list}
                            />
                            <MenuItem
                                id="facility-add"
                                href={appRouter.facilities("add")}
                                label={translationFacilitiesSubMenu.create}
                            />
                        </MenuItem>
                        <MenuItem
                            id={"users"}
                            href={appRouter.users()}
                            label={translationUsers}
                            icon={<Users />}
                            {...menuItemsProps}
                        >
                            <MenuItem
                                id={"users-all"}
                                href={appRouter.users()}
                                label={translationUsersSubMenu.list}
                            />
                            <MenuItem
                                id={"users-add"}
                                label={translationUsersSubMenu.create}
                            />
                        </MenuItem>
                    </>
                ) : null}
            </Accordion>
        </div>
    );
};

export default SidebarMenu;
