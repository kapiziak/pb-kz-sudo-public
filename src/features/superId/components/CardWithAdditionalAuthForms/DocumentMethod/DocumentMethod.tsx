import Translation from "@/src/application/lang/client/Translation";
import IconButton from "@/src/components/ui/icon-button";
import { FileSearch } from "lucide-react";

export default function DocumentMethod() {
    return (
        <div className="flex gap-8 justify-between">
            <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                    <Translation name="features.superId.documentMethod.name" />
                </h3>
                <span>
                    <Translation
                        name="features.superId.documentMethod.value"
                        variables={["WI*****"]}
                    />
                </span>
            </div>
            <div>
                <IconButton icon={<FileSearch />}>
                    <Translation name="general.changeAction" />
                </IconButton>
            </div>
        </div>
    );
}
