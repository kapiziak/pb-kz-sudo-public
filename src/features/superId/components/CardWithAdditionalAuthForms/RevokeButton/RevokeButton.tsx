import { useRevokeSuperId } from "@/src/api/hooks/superId/revoke-super-id";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Button } from "@/src/components/ui/button";
import { useToast } from "@/src/components/ui/use-toast";
import { useTransition } from "react";
import { useSelector } from "react-redux";

export default function RevokeButton() {
    const lang = useSelector(appSelectLanguage);

    const { mutate } = useRevokeSuperId();
    const { toast } = useToast();

    const successMsg = useTranslation({
        lang,
        name: "features.superId.revokeButton.revokeSuccess",
    });

    const errorMsg = useTranslation({
        lang,
        name: "features.superId.revokeButton.revokeError",
    });

    function handleRevokeSuperId() {
        mutate(
            {},
            {
                onSuccess: (data) => {
                    if (data.data?.status === "error") {
                        toast({
                            title: errorMsg,
                            variant: "destructive",
                        });
                        return;
                    }
                    toast({
                        title: successMsg,
                        variant: "default",
                    });
                },
                onError: () => {
                    toast({
                        title: errorMsg,
                        variant: "destructive",
                    });
                },
            }
        );
    }

    return (
        <div>
            <Button
                className="w-full"
                variant={"destructive"}
                onClick={handleRevokeSuperId}
            >
                <Translation name="features.superId.revokeButton.revokeText" />
            </Button>
        </div>
    );
}
