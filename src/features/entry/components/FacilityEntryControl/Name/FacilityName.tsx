import { KeyRound } from "lucide-react";
import TFacilityControlStatus from "../types/facility-control-status";

interface Props {
    name: string;
    status: TFacilityControlStatus;
}

export default function FacilityName({ name, status }: Props) {
    const iconClassNames =
        status === "free" ? "text-slate-700" : "text-red-700";

    return (
        <div className="flex font-bold items-center gap-1">
            <KeyRound width={16} height={16} className={iconClassNames} />{" "}
            {name}
        </div>
    );
}
