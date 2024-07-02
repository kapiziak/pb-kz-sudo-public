import { useDeleteFacility } from "@/src/api/hooks/facilities/delete-facility";
import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import IconButton from "@/src/components/ui/icon-button";
import { useToast } from "@/src/components/ui/use-toast";
import { Trash } from "lucide-react";
import { useState } from "react";
import FacilitiesTableActionDelete from "./Delete";
import FacilitiesTableActionEdit from "./Edit";

interface Props {
    facilityId: string;
    facilityName: string;
}
export default function FacilitiesTableRowActions({
    facilityId,
    facilityName,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const { mutate } = useDeleteFacility();
    const { toast } = useToast();

    function handleDelete() {
        setOpen(false);
        mutate(
            {
                id: facilityId,
            },
            {
                onSuccess: (data) => {
                    if (data.error) {
                        toast({
                            variant: "destructive",
                            title: "Wystąpił błąd podczas usuwania obiektu.",
                        });
                        return;
                    }

                    toast({
                        variant: "default",
                        title: "Usunięto obiekt.",
                    });
                },
            }
        );
    }

    return (
        <>
            <FacilitiesTableActionEdit
                facilityId={facilityId}
                facilityName={facilityName}
            />
            <FacilitiesTableActionDelete facilityId={facilityId} />
        </>
    );
}
