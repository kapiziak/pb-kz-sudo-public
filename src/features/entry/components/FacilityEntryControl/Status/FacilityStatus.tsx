import Translation from "@/src/application/lang/client/Translation";
import TFacilityControlStatus from "../types/facility-control-status";

interface Props {
    status: TFacilityControlStatus;
}

const statusClassNames = "text-slate-700";

export default function FacilityStatus({ status }: Props) {
    switch (status) {
        case "free":
            return <div className={statusClassNames}></div>;
        case "busy":
            return (
                <div className={statusClassNames}>
                    <Translation name="features.entry.facilityEntryControl.actionBtn.busyLabel" />
                </div>
            );
        case "occupied":
            return (
                <div className={statusClassNames}>
                    <Translation name="features.entry.facilityEntryControl.actionBtn.occupiedLabel" />
                </div>
            );
        default:
            throw new Error(`[FacilityStatus] Unknown status => ${status}`);
    }
}
