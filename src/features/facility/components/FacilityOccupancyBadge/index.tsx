import { useCheckFacilityOccupancy } from "@/src/api/hooks/facilities/get-facility-occupancies";
import Translation from "@/src/application/lang/client/Translation";
import { Badge } from "@/src/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { Skeleton } from "@/src/components/ui/skeleton";
import { TypographyH3 } from "@/src/components/ui/typography";
import { useState } from "react";
import SingleOccupancy from "./OccupancyInfo/SingleOccupancy/SingleOccupancy";

interface Props {
    facilityId: number;
    isOccupied: boolean;
}

export default function FacilityOccupancyBadge({
    facilityId,
    isOccupied,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const { data, isLoading } = useCheckFacilityOccupancy({
        enabled: open,
        facilityId,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {!isOccupied ? (
                    <Badge className="cursor-pointer" variant="default">
                        <Translation name="features.facilities.facilitiesTable.table.rows.statuses.free" />
                    </Badge>
                ) : (
                    <Badge className="cursor-pointer" variant={"destructive"}>
                        <Translation name="features.facilities.facilitiesTable.table.rows.statuses.busy" />
                    </Badge>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center justify-between me-6">
                        <TypographyH3>
                            <Translation name="features.facilities.facilitiesTable.occupancy.heading" />
                        </TypographyH3>
                        {!isOccupied ? (
                            <Badge
                                className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                                variant="default"
                            >
                                <Translation name="features.facilities.facilitiesTable.table.rows.statuses.free" />
                            </Badge>
                        ) : (
                            <Badge
                                className="text-sm bg-red-600 text-white px-2 py-1 rounded"
                                variant="default"
                            >
                                <Translation name="features.facilities.facilitiesTable.table.rows.statuses.busy" />
                            </Badge>
                        )}
                    </div>
                </DialogHeader>
                {isLoading || !data?.data?.data.occupancies ? (
                    <Skeleton />
                ) : (
                    data?.data?.data.occupancies.map((x) => (
                        <SingleOccupancy
                            key={x.id}
                            occupancy={x}
                            onFacilityRelease={() => setOpen(false)}
                        />
                    ))
                )}
            </DialogContent>
        </Dialog>
    );
}
