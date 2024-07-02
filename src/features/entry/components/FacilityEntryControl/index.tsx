import { useCheckFacilityOccupancy } from "@/src/api/hooks/facilities/get-facility-occupancies";
import IconButton from "@/src/components/ui/icon-button";
import { ArrowUpLeftSquare, KeyRound } from "lucide-react";
import { useMemo, useState } from "react";
import FacilityActionButton from "./ActionButton/FacilityActionButton";
import FacilityName from "./Name/FacilityName";
import FacilityStatus from "./Status/FacilityStatus";
import TFacilityControlStatus from "./types/facility-control-status";

interface Props {
    facilityId: number;
    name: string;
    status: TFacilityControlStatus;
    occupierId: number;
    authorizationId?: number;
}

/**
 * Watch out! This components need to be wrapped with context provider
 */

export default function FacilityEntryControl({
    facilityId,
    name,
    status,
    occupierId,
    authorizationId,
}: Props) {
    const [isCheckEnabled, setIsCheckEnabled] = useState<boolean>(false);

    const { data, refetch } = useCheckFacilityOccupancy({
        facilityId,
        enabled: true,
    });

    const entryStatus = useMemo(() => {
        if (data) {
            return data.data?.data.isOccupied ? "occupied" : "free";
        } else {
            return status;
        }
    }, [data, status]);

    function handleRefreshStatus() {
        refetch();
        // setIsCheckEnabled(true);
    }

    return (
        <div className="flex justify-between items-center my-4">
            <div className="flex w-[33%]">
                <FacilityName name={name} status={entryStatus} />
            </div>
            <div className="flex w-[33%] justify-center uppercase text-sm">
                <FacilityStatus status={entryStatus} />
            </div>
            <div className="flex w-[33%] justify-end">
                <FacilityActionButton
                    status={entryStatus}
                    facilityId={facilityId}
                    occupierId={occupierId}
                    authorizationId={authorizationId}
                    onStatusChange={handleRefreshStatus}
                />
            </div>
        </div>
    );
}
