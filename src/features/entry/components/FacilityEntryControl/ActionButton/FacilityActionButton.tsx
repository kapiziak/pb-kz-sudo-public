import { useAddEntry } from "@/src/api/hooks/entry/add-new-entry";
import { useReleaseFacilityOccupancy } from "@/src/api/hooks/facilities/release-facility-occupancy";
import useTranslation from "@/src/application/lang/client/useTranslation";
import IconButton, { IconButtonProps } from "@/src/components/ui/icon-button";
import { useToast } from "@/src/components/ui/use-toast";
import { ArrowUpLeftSquare } from "lucide-react";
import TFacilityControlStatus from "../types/facility-control-status";

interface Props {
    status: TFacilityControlStatus;
    facilityId: number;
    occupierId: number;
    authorizationId?: number;
    onStatusChange?: () => void;
}

export default function FacilityActionButton({
    status,
    facilityId,
    occupierId,
    authorizationId,
    onStatusChange,
}: Props) {
    const { mutate: addMutate } = useAddEntry();
    const { mutate: releaseMutate } = useReleaseFacilityOccupancy();

    const { toast } = useToast();

    const toastTranslations = {
        entrySuccess: useTranslation({
            name: "features.entry.facilityEntryControl.actionBtn.toast.addSuccess",
        }),
        entryError: useTranslation({
            name: "features.entry.facilityEntryControl.actionBtn.toast.addError",
        }),
        releaseSuccess: useTranslation({
            name: "features.entry.facilityEntryControl.actionBtn.toast.releaseSuccess",
        }),
        releaseError: useTranslation({
            name: "features.entry.facilityEntryControl.actionBtn.toast.releaseError",
        }),
    };

    const freeBtnMsg = useTranslation({
        name: "features.entry.facilityEntryControl.actionBtn.freeLabel",
    });

    const busyBtnMsg = useTranslation({
        name: "features.entry.facilityEntryControl.actionBtn.busyLabel",
    });

    const occupiedBtnMsg = useTranslation({
        name: "features.entry.facilityEntryControl.actionBtn.occupiedLabel",
    });

    function handleAddSuccess() {
        onStatusChange?.();

        toast({
            variant: "default",
            title: toastTranslations.entrySuccess,
        });
    }

    function handleAddError() {
        toast({
            variant: "destructive",
            title: toastTranslations.entryError,
        });
    }

    function handleReleaseSuccess() {
        onStatusChange?.();

        toast({
            variant: "default",
            title: toastTranslations.releaseSuccess,
        });
    }

    function handleReleaseError() {
        toast({
            variant: "destructive",
            title: toastTranslations.releaseError,
        });
    }

    function renderBtnLabel() {
        switch (status) {
            case "free":
                return freeBtnMsg;
            case "busy":
                return busyBtnMsg;
            case "occupied":
                return occupiedBtnMsg;
            default:
                throw new Error(`[FacilityStatus] Unknown status => ${status}`);
        }
    }

    const buttonProps: Partial<IconButtonProps> = {
        variant: status !== "free" ? "destructive" : "default",
    };

    function handleClick() {
        switch (status) {
            case "free":
                addMutate(
                    {
                        facilitiesIds: [facilityId],
                        occupierId,
                        authorizationId,
                    },
                    {
                        onSuccess: (data) => {
                            if (data.data?.status !== "success") {
                                console.error(
                                    `[FacilityActionButton] Api Error Add Entry Mutate =>`,
                                    data.data?.data
                                );
                                handleAddError();
                                return;
                            }

                            handleAddSuccess();
                        },
                        onError: handleAddError,
                    }
                );
                break;
            case "busy":
                break;
            case "occupied":
                releaseMutate(
                    {
                        facilityId,
                    },
                    {
                        onSuccess: (data) => {
                            if (data.data?.status !== "success") {
                                console.error(
                                    `[FacilityActionButton] Api Error Release Entry Mutate =>`,
                                    data.data?.data
                                );
                                handleReleaseError();
                                return;
                            }
                            handleReleaseSuccess();
                        },
                        onError: handleReleaseError,
                    }
                );
                break;
            default:
                throw new Error(`[FacilityStatus] Unknown status => ${status}`);
        }
    }

    return (
        <IconButton
            icon={<ArrowUpLeftSquare />}
            onClick={handleClick}
            size="sm"
            {...buttonProps}
        >
            {renderBtnLabel()}
        </IconButton>
    );
}
