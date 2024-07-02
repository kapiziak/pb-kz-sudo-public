"use client";

import Translation from "@/src/application/lang/client/Translation";
import useAppRouter from "@/src/application/routing/useAppRouter";
import { ShieldCheckIcon } from "lucide-react";
import ShortcutCard from "../ShortcutCard";

export default function NewAuthorizationShortcut() {
    const router = useAppRouter();

    return (
        <ShortcutCard
            icon={<ShieldCheckIcon width={"1em"} height={"1em"} />}
            title={<Translation name="common.shortcuts.authorizations.title" />}
            caption={
                <Translation name="common.shortcuts.authorizations.caption" />
            }
            href={router.authorizations("add")}
            variant="purple-pink-red"
        />
    );
}
