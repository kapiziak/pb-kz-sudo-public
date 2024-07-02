import { useReleaseFacilityOccupancy } from "@/src/api/hooks/facilities/release-facility-occupancy";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
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
import { useToast } from "@/src/components/ui/use-toast";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

interface Props {
    facilityId: number;
    onFacilityRelease?: () => void;
}

export default function ReleaseFacilityButton({
    facilityId,
    onFacilityRelease,
}: Props) {
    const { mutate, isLoading } = useReleaseFacilityOccupancy();
    const [open, setOpen] = useState<boolean>(false);

    const { toast } = useToast();

    const errorTranslations = {
        heading: useTranslation({
            name: "features.facilities.facilitiesTable.occupancy.toast.errorHeading",
        }),
        msg: useTranslation({
            name: "features.facilities.facilitiesTable.occupancy.toast.errorMsg",
        }),
    };

    const okTranslations = {
        msg: useTranslation({
            name: "features.facilities.facilitiesTable.occupancy.toast.okMsg",
        }),
    };

    function handleRelease() {
        setOpen(false);
        mutate(
            {
                facilityId,
            },
            {
                onSuccess: (data) => {
                    if (data.data?.status !== "success") {
                        toast({
                            title: errorTranslations.heading,
                            description: errorTranslations.msg,
                            variant: "destructive",
                        });
                        console.error(data.data?.data);
                        return;
                    }
                    toast({
                        title: okTranslations.msg,
                        variant: "default",
                    });
                    onFacilityRelease?.();
                },
                onError: () => {
                    toast({
                        title: errorTranslations.heading,
                        description: errorTranslations.msg,
                        variant: "destructive",
                    });
                },
            }
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <RefreshCw className="animate-spin w-4 me-2" />
                    ) : null}
                    <Translation
                        name="features.facilities.facilitiesTable.occupancy.releaseBtn"
                        variables={[facilityId]}
                    />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Translation name="features.facilities.facilitiesTable.occupancy.confirmHeading" />
                    </DialogTitle>
                    <DialogDescription>
                        <Translation name="features.facilities.facilitiesTable.occupancy.confirmMsg" />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={handleRelease}>
                        <Translation name="appDialogs.generalDelete.confirmBtn" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
