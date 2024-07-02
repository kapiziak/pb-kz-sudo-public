import { useSecretSuperId } from "@/src/api/hooks/superId/use-secret";
import Translation from "@/src/application/lang/client/Translation";
import { Button } from "@/src/components/ui/button";

interface Props {
    secret: string;
    onDataReceived?(data: {
        challengeId: string;
        studentId?: string;
        identityCardId?: string;
        userId: number;
    }): void;
    onError?(err: string): void;
}

export default function ReceiveChallengeButton({
    secret,
    onDataReceived,
    onError,
}: Props) {
    const { mutate } = useSecretSuperId();

    function handleUseSecret() {
        mutate(
            { secret },
            {
                onSuccess: (data) => {
                    if (!data.data || data.data.status === "error") {
                        console.error(
                            "[ReceiveChallengeButton] Error while receiving challenge => ",
                            data.data?.data ?? "Unknown error"
                        );

                        onError?.(
                            JSON.stringify(data.data?.data ?? "Unknown error")
                        );

                        return;
                    }

                    const res = data.data.data;

                    onDataReceived?.({
                        challengeId: res.challengeId,
                        studentId: res.studentId,
                        identityCardId: res.identityCardId,
                        userId: res.userId,
                    });
                },
                onError: (err) => {
                    console.error(
                        "[ReceiveChallengeButton] Error while receiving challenge => ",
                        err
                    );

                    onError?.(JSON.stringify(err));
                },
            }
        );
    }

    return (
        <Button onClick={handleUseSecret}>
            <Translation name="features.superId.challengeSolver.receiveBtn" />
        </Button>
    );
}
