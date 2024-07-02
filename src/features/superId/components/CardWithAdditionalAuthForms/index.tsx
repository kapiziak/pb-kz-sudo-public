import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import IconButton from "@/src/components/ui/icon-button";
import { FileSearch, PencilLine } from "lucide-react";
import DocumentMethod from "./DocumentMethod/DocumentMethod";
import PinMethod from "./PinMethod/PinMethod";
import RevokeButton from "./RevokeButton/RevokeButton";

export default function CardWithAdditionalAuthForms() {
    return (
        <Card>
            <CardContent className="flex p-4 h-full">
                <div className="flex flex-col gap-4">
                    <PinMethod />
                    <DocumentMethod />
                    <div className="mt-auto">
                        <RevokeButton />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
