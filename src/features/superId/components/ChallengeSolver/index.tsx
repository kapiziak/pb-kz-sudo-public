import { useGetProfile } from "@/src/api/hooks/profile/get-profile";
import { useSendChallenge } from "@/src/api/hooks/superId/challenge/send-challenge";
import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import IconButton from "@/src/components/ui/icon-button";
import { Input } from "@/src/components/ui/input";
import { Skeleton } from "@/src/components/ui/skeleton";
import { useToast } from "@/src/components/ui/use-toast";
import FacilityEntryControl from "@/src/features/entry/components/FacilityEntryControl";
import {
    BadgeCheck,
    BadgeInfo,
    CheckCircleIcon,
    GraduationCap,
    UserCheck2Icon,
    UserSquare2,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import {
    TChallengeData,
    TChallengeSolvedData,
} from "../../types/challenge-data";
import LightHeadingWithText from "./LightHeadingWithText/LightHeadingWithText";
import ReceiveChallengeButton from "./ReceiveChallengeBtn/ReceiveChallengeButton";

interface Props {
    secret: string;
}

interface IdleStageProps {
    secret: string;
    onChallengeReceived(data: TChallengeData): void;
}

function IdleStage({ secret, onChallengeReceived }: IdleStageProps) {
    const { toast } = useToast();

    const errorMsg = useTranslation({
        name: "features.superId.challengeSolver.toast.receiveError",
    });

    function handleError() {
        toast({
            title: errorMsg,
            variant: "destructive",
        });
    }

    return (
        <div>
            <ReceiveChallengeButton
                secret={secret}
                onDataReceived={onChallengeReceived}
                onError={handleError}
            />
        </div>
    );
}

interface ChallengeStageProps {
    data: TChallengeData;
    onChallengeSolved(data: TChallengeSolvedData): void;
}

function ChallengeStage({ data, onChallengeSolved }: ChallengeStageProps) {
    const [pin, setPin] = useState<string>("");

    const { data: profileData, isLoading: isLoadingProfileData } =
        useGetProfile({
            userId: data.userId,
        });

    const profile = profileData?.data?.data?.profile;

    const { mutate } = useSendChallenge();
    const { toast } = useToast();

    const errorMsg = useTranslation({
        name: "features.superId.challengeSolver.challenge.toast.error",
    });

    const successMsg = useTranslation({
        name: "features.superId.challengeSolver.challenge.toast.accepted",
    });

    function handleSendChallenge() {
        mutate(
            {
                challengeId: data.challengeId,
                pin,
            },
            {
                onSuccess: (data) => {
                    setPin("");
                    if (!data.data || data.data.status === "error") {
                        console.error(
                            "[ChallengeStage] Error while sending challenge => ",
                            data.data?.data ?? "Unknown error"
                        );

                        toast({
                            title: errorMsg,
                            variant: "destructive",
                        });

                        return;
                    }

                    const res = data.data.data;

                    onChallengeSolved({
                        // TODO fix it in the future
                        // @ts-expect-error
                        authorizations: res.authorizations,
                        profile: res.profile ?? null,
                        user: res.user,
                    });

                    toast({
                        title: successMsg,
                    });
                },
            }
        );
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex">
                    <div className="flex-1 flex-col gap-1">
                        <div className="border rounded-lg border-slate-800 px-3 py-2">
                            <div>
                                <LightHeadingWithText
                                    heading={
                                        <Translation name="features.superId.challengeSolver.challenge.firstNameAndSurname" />
                                    }
                                    content={
                                        <span className="font-bold flex gap-2">
                                            <UserCheck2Icon />{" "}
                                            {isLoadingProfileData ? (
                                                <Skeleton />
                                            ) : profile ? (
                                                `${profile.firstName} ${profile.surname}`
                                            ) : (
                                                "-"
                                            )}
                                        </span>
                                    }
                                />
                            </div>
                            <div>
                                <LightHeadingWithText
                                    heading={
                                        <Translation name="features.superId.challengeSolver.challenge.idCard" />
                                    }
                                    content={
                                        <span className="font-bold flex gap-2">
                                            <UserSquare2 />{" "}
                                            {data.identityCardId}
                                        </span>
                                    }
                                />
                            </div>
                            <div className="mt-2">
                                <LightHeadingWithText
                                    heading={
                                        <Translation name="features.superId.challengeSolver.challenge.studentId" />
                                    }
                                    content={
                                        <span className="font-bold flex gap-2">
                                            <GraduationCap />
                                            {data.studentId}
                                        </span>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative flex-grow max-w-[200px] p-4 items-end">
                        <div className="relative w-full h-full">
                            <Image
                                src={
                                    profile?.avatarUrl ?? "/assets/img/av_1.png"
                                }
                                alt="Avatar"
                                fill
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <LightHeadingWithText
                        heading={
                            <Translation name="features.superId.challengeSolver.challenge.challengeId" />
                        }
                        content={data.challengeId}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row w-full gap-2 mt-8">
                    <Input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full"
                        placeholder={useTranslation({
                            name: "features.superId.challengeSolver.challenge.insertPin",
                        })}
                    />
                    <IconButton
                        onClick={handleSendChallenge}
                        className="text-white bg-blue-600 hover:bg-blue-500 w-full"
                        icon={<CheckCircleIcon />}
                    >
                        <Translation name="features.superId.challengeSolver.challenge.authorize" />
                    </IconButton>
                </div>
            </CardFooter>
        </Card>
    );
}

interface SuccessStageProps {
    data: TChallengeSolvedData;
}

function SuccessStage({ data }: SuccessStageProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex">
                    <div className="w-full">
                        <div className="flex flex-col">
                            <h2 className="font-extrabold text-green-600 uppercase mb-2">
                                <Translation name="features.superId.challengeSolver.finalStage.successHeading" />
                            </h2>
                            <div className="flex w-full gap-4">
                                <div className="w-full border rounded-lg border-slate-800 py-4 px-2">
                                    <div>
                                        <LightHeadingWithText
                                            heading={
                                                <Translation name="features.superId.challengeSolver.challenge.firstNameAndSurname" />
                                            }
                                            content={
                                                data.profile
                                                    ? `${data.profile.firstName} ${data.profile.surname}`
                                                    : "-"
                                            }
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <LightHeadingWithText
                                            heading={"E-MAIL"}
                                            content={data.user.email}
                                        />
                                    </div>
                                </div>
                                <div className="flex relative w-16 md:w-32 items-center text-green-600">
                                    <BadgeCheck className="w-32 h-32 stroke-1" />
                                </div>
                            </div>
                            <div className="mt-7 mb-4">
                                <h3 className="flex font-light uppercase items-center gap-2">
                                    <Translation
                                        name="features.superId.challengeSolver.finalStage.accessTo"
                                        variables={[
                                            data.authorizations.flatMap(
                                                (x) => x.scopeFacility
                                            ).length,
                                        ]}
                                    />

                                    <BadgeInfo />
                                </h3>
                            </div>
                            <div>
                                {data.authorizations.map((authorization) =>
                                    authorization.scopeFacility.map((item) => (
                                        <FacilityEntryControl
                                            key={item.id}
                                            facilityId={+item.id}
                                            name={item.name}
                                            occupierId={+data.user.id}
                                            status="free"
                                            authorizationId={+authorization.id}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ChallengeSolver(props: Props) {
    const [stage, setStage] = useState<"idle" | "challenge" | "success">(
        "idle"
    );
    const [challengeData, setChallengeData] = useState<TChallengeData | null>(
        null
    );
    const [challengeSolvedData, setChallengeSolvedData] =
        useState<TChallengeSolvedData | null>(null);

    const handleChallengeReceived = useCallback((data: TChallengeData) => {
        setChallengeData(data);
        setStage("challenge");
    }, []);

    const handleChallengeSolved = useCallback((data: TChallengeSolvedData) => {
        setChallengeSolvedData(data);
        setStage("success");
    }, []);

    switch (stage) {
        case "idle":
            return (
                <IdleStage
                    secret={props.secret}
                    onChallengeReceived={handleChallengeReceived}
                />
            );

        case "challenge":
            if (!challengeData) {
                throw new Error(`[ChallengeSolver] Challenge data is null`);
            }

            return (
                <ChallengeStage
                    data={challengeData}
                    onChallengeSolved={handleChallengeSolved}
                />
            );

        case "success":
            if (!challengeSolvedData) {
                throw new Error(
                    `[ChallengeSolver] Challenge solved data is null`
                );
            }

            return <SuccessStage data={challengeSolvedData} />;
        default:
            return null;
    }
}
