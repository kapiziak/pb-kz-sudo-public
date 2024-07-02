"use client";

import Translation from "@/src/application/lang/client/Translation";
import useAppRouter from "@/src/application/routing/useAppRouter";
import { BookIcon } from "lucide-react";
import ShortcutCard from "../ShortcutCard";

export default function EntriesShortcut() {
    const router = useAppRouter();

    return (
        <ShortcutCard
            icon={<BookIcon width={"1em"} height={"1em"} />}
            title={<Translation name="common.shortcuts.entries.title" />}
            caption={<Translation name="common.shortcuts.entries.caption" />}
            href={router.entries()}
        />
    );
}
