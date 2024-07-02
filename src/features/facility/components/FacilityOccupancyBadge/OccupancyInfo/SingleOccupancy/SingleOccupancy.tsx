import { useGetEntry } from "@/src/api/hooks/entry/get-entry";
import { components } from "@/src/api/v1";
import Translation from "@/src/application/lang/client/Translation";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar";
import { Separator } from "@/src/components/ui/separator";
import { Skeleton } from "@/src/components/ui/skeleton";
import ReleaseFacilityButton from "../../../ReleaseFacilityButton";

interface Props {
    occupancy: components["schemas"]["FacilityOccupancy"];
    onFacilityRelease?: () => void;
}

export default function SingleOccupancy({
    occupancy,
    onFacilityRelease,
}: Props) {
    const { data, isLoading } = useGetEntry({
        entryId: +occupancy.relatedEntryId,
    });

    const entry = data?.data?.data?.entry;

    return (
        <div>
            {isLoading || !entry ? (
                <Skeleton />
            ) : (
                <div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 mt-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage
                                        alt="User Avatar"
                                        src="/placeholder-avatar.jpg"
                                    />
                                    <AvatarFallback>KZ</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5 text-xs">
                                    <div className="font-medium">
                                        Brak profilu
                                    </div>
                                    <div className="text-zinc-500 dark:text-zinc-400">
                                        {entry.occupier.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="gap-3">
                            <div className="flex justify-between items-center">
                                <div className="font-medium">
                                    <Translation name="features.facilities.facilitiesTable.occupancy.authorizedBy" />
                                </div>

                                <div className="flex items-center gap-3 mt-3">
                                    <div className="grid gap-0.5 text-xs">
                                        {entry.authorizedBy.email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="font-medium">
                                    <Translation name="features.facilities.facilitiesTable.occupancy.date" />
                                </div>

                                <div className="flex items-center gap-3 mt-3">
                                    <div className="grid gap-0.5 text-xs">
                                        {entry.entryAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <ReleaseFacilityButton
                            facilityId={+occupancy.facilityId}
                            onFacilityRelease={onFacilityRelease}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
