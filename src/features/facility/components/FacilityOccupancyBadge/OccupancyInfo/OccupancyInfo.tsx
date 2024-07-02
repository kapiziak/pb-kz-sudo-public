import { components } from "@/src/api/v1";
import SingleOccupancy from "./SingleOccupancy/SingleOccupancy";

interface Props {
    occupancy: components["schemas"]["FacilityOccupancy"][];
}

export default function OccupancyInfo({ occupancy }: Props) {
    return (
        <div>
            
        </div>
    );
}
