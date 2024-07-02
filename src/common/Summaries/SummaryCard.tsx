import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { ReactNode } from "react";

interface Props {
    title: string | ReactNode;
    count: number;
    caption: string | ReactNode;
    icon?: ReactNode;
    isLoading?: boolean;
}

export default function SummaryCard({
    title,
    count,
    caption,
    icon,
    isLoading,
}: Props) {
    if (isLoading) {
        return <Skeleton className="h-full w-full" />;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">{caption}</p>
            </CardContent>
        </Card>
    );
}
