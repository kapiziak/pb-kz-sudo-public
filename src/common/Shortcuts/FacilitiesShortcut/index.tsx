"use client";

import Translation from "@/src/application/lang/client/Translation";
import useAppRouter from "@/src/application/routing/useAppRouter";
import { HomeIcon } from "lucide-react";
import ShortcutCard from "../ShortcutCard";

export default function FacilitiesShortcut() {
    const router = useAppRouter();

    return (
        <ShortcutCard
            icon={<HomeIcon width={"1em"} height={"1em"} />}
            title={<Translation name="common.shortcuts.facilities.title" />}
            caption={<Translation name="common.shortcuts.facilities.caption" />}
            href={router.facilities("list")}
            variant="slate-slate-slate"
        />
    );
}
