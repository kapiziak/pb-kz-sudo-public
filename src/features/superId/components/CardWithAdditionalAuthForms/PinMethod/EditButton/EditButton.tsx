import { useCreateSuperId } from "@/src/api/hooks/superId/create-super-id";
import { useRevokeSuperId } from "@/src/api/hooks/superId/revoke-super-id";
import { useUpdateSuperId } from "@/src/api/hooks/superId/update-super-id";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Button } from "@/src/components/ui/button";
import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/src/components/ui/dialog";
import IconButton from "@/src/components/ui/icon-button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useToast } from "@/src/components/ui/use-toast";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function EditButton() {
    const [open, setOpen] = useState<boolean>(false);
    const [pin, setPin] = useState<string>("");

    const lang = useSelector(appSelectLanguage);

    const successMsg = useTranslation({
        lang,
        name: "features.superId.pinMethod.edit.successChangedPin",
    });

    const errorMsg = useTranslation({
        lang,
        name: "features.superId.pinMethod.edit.failure",
    });

    const { mutate } = useUpdateSuperId();
    const { toast } = useToast();

    function handleEdit() {
        setOpen(false);

        mutate(
            {
                pin,
            },
            {
                onSuccess: () => {
                    setPin("");
                    toast({
                        title: successMsg,
                    });
                },
                onError: () => {
                    toast({
                        variant: "destructive",
                        title: errorMsg,
                    });
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <IconButton icon={<PencilLine />}>
                    <Translation name="general.editAction" />
                </IconButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        <Translation name="features.superId.pinMethod.edit.modalTitle" />
                    </DialogTitle>
                    <DialogDescription>
                        <Translation name="features.superId.pinMethod.edit.modalText" />
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            <Translation name="features.superId.pinMethod.edit.pinInput.label" />
                        </Label>
                        <Input
                            id="pin"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder={useTranslation({
                                lang,
                                name: "features.superId.pinMethod.edit.pinInput.placeholder",
                            })}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleEdit}>
                        <Translation name="features.superId.pinMethod.edit.modalBtn" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
