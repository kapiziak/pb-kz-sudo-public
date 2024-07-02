import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/src/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    icon?: ReactNode;
    title: string | ReactNode;
    caption: string | ReactNode;
    href: string;
    variant?: "purple-pink-red" | "slate-slate-slate";
}

export default function ShortcutCard({
    icon,
    caption,
    href,
    title,
    variant,
}: Props) {
    function renderVariant() {
        switch (variant) {
            case "purple-pink-red":
                return "from-purple-400 via-pink-500 to-red-500";
            case "slate-slate-slate":
                return "from-slate-400 via-slate-500 to-slate-600";
            default:
                return "from-orange-400 via-orange-500 to-orange-600";
        }
    }

    function renderColor() {
        switch (variant) {
            case "purple-pink-red":
            case "slate-slate-slate":
                return "text-white";
            default:
                return "text-white";
        }
    }

    return (
        <Link href={href}>
            <Card
                className={`group bg-gradient-to-r ${renderVariant()} hover:opacity-90 cursor-pointer transition-all duration-200 ease-in-out`}
            >
                <CardContent className="relative p-6">
                    <CardTitle
                        className={`flex gap-1 items-center ${renderColor()} text-lg font-bold`}
                    >
                        {icon}
                        {title}
                    </CardTitle>
                    <CardDescription
                        className={`flex justify-between ${renderColor()}  text-sm mt-2`}
                    >
                        <div>
                            <span>{caption}</span>
                        </div>

                        <div
                            className={`group-hover:opacity-100 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 ease-in-out`}
                        >
                            <ArrowRight width={32} height={32} />
                        </div>
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    );
}
