import { useDeleteFacility } from "@/src/api/hooks/facilities/delete-facility";
import { useEditFacility } from "@/src/api/hooks/facilities/edit-facility";
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
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useToast } from "@/src/components/ui/use-toast";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
    facilityId: string;
    facilityName: string;
}
export default function FacilitiesTableActionEdit({
    facilityId,
    facilityName,
}: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>(() => facilityName);

    const lang = useSelector(appSelectLanguage);

    const { mutate } = useEditFacility();
    const { toast } = useToast();

    const translationErrorMsg = useTranslation({
        lang,
        name: "features.facilities.facilitiesTable.messages.editError",
    });

    const translationSuccessMsg = useTranslation({
        lang,
        name: "features.facilities.facilitiesTable.messages.editSuccess",
    });

    function handleEdit() {
        setOpen(false);
        mutate(
            {
                id: facilityId,
                name,
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
                <IconButton size={"sm"} variant="ghost" icon={<Pencil />} />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <Translation name="features.facilities.facilitiesTable.dialogs.edit.title" />
                    </DialogTitle>
                    <DialogDescription>
                        <Translation name="features.facilities.facilitiesTable.dialogs.edit.description" />
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            <Translation name="features.facilities.facilitiesTable.table.columns.name" />
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleEdit}>
                        <Translation name="features.facilities.facilitiesTable.dialogs.edit.saveBtn" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
