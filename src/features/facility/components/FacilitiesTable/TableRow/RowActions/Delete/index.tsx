import { useDeleteFacility } from "@/src/api/hooks/facilities/delete-facility";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
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
import { useSelector } from "react-redux";

interface Props {
    facilityId: string;
}
export default function FacilitiesTableActionDelete({ facilityId }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    const lang = useSelector(appSelectLanguage);

    const { mutate } = useDeleteFacility();
    const { toast } = useToast();

    const translationErrorMsg = useTranslation({
        lang,
        name: "features.facilities.facilitiesTable.messages.deleteError",
    });

    const translationSuccessMsg = useTranslation({
        lang,
        name: "features.facilities.facilitiesTable.messages.deleteSuccess",
    });

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
                            title: translationErrorMsg,
                        });
                        return;
                    }

                    toast({
                        variant: "default",
                        title: translationSuccessMsg,
                    });
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <IconButton size={"sm"} variant="ghost" icon={<Trash />} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Translation name="appDialogs.generalDelete.title" />
                    </DialogTitle>
                    <DialogDescription>
                        <Translation name="appDialogs.generalDelete.description" />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={handleDelete}>
                        <Translation name="appDialogs.generalDelete.confirmBtn" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
