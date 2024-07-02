import Translation from "@/src/application/lang/client/Translation";
import IconButton from "@/src/components/ui/icon-button";
import { PencilLine } from "lucide-react";
import EditButton from "./EditButton/EditButton";

export default function PinMethod() {
    return (
        <div className="flex gap-8 justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                    <Translation name="features.superId.pinMethod.name" />
                </h3>
                <span>
                    <Translation
                        name="features.superId.pinMethod.value"
                        variables={["****"]}
                    />
                </span>
            </div>
            <div>
                <EditButton />
            </div>
        </div>
    );
}
