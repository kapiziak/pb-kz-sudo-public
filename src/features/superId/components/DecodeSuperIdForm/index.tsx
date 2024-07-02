"use client";

import Translation from "@/src/application/lang/client/Translation";
import useTranslation from "@/src/application/lang/client/useTranslation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/src/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/src/components/ui/tabs";
import { useToast } from "@/src/components/ui/use-toast";
import React, { useCallback, useMemo, useState } from "react";
import ChallengeSolver from "../ChallengeSolver";
import TakePictureMethod from "./Methods/Camera/TakePictureMethod";
import ManualFileScanMethod from "./Methods/ManualFile/ManualFileScanMethod";
import {
    superIdDecodeMethods,
    TSuperIdDecodeMethod,
} from "./types/decode-methods";

interface ContentProps {
    children?: React.ReactNode;
    method: TSuperIdDecodeMethod;
    handleSecretDetected(secret: string): void;
    handleErrorDetected(err: string): void;
}

function Content({
    children,
    method,
    handleErrorDetected,
    handleSecretDetected,
}: ContentProps) {
    const renderMethod = useMemo(() => {
        if (method === null) return null;

        const props = {
            onSecretDetected: handleSecretDetected,
            onDetectError: handleErrorDetected,
        };

        switch (method) {
            case "camera":
                return <TakePictureMethod {...props} />;
            case "manual":
                return null;
            case "scanFile":
                return <ManualFileScanMethod {...props} />;
            default:
                throw new Error(
                    `[DecodeSuperIdForm] Method not implemented => ${method}`
                );
        }
    }, [handleErrorDetected, handleSecretDetected, method]);

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    <Translation name="features.superId.decodeForm.chooseFileDesc" />
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">{renderMethod}</CardContent>
        </Card>
    );
}

export default function DecodeSuperIdForm() {
    const [method, setMethod] = useState<TSuperIdDecodeMethod>("scanFile");
    const [secret, setSecret] = useState<string | null>(null);

    const { toast } = useToast();

    const uploadSuccessMsg = useTranslation({
        name: "features.superId.decodeForm.uploadSuccess",
    });

    const uploadErrorMsg = useTranslation({
        name: "features.superId.decodeForm.uploadError",
    });

    const handleSecretDetected = useCallback(
        (secret: string) => {
            setSecret(secret);

            toast({
                title: uploadSuccessMsg,
            });
        },
        [toast, uploadSuccessMsg]
    );

    const handleErrorDetected = useCallback(
        (err: string) => {
            console.error(
                `[DecodeSuperIdForm] Error while detecting secret => ${err}`
            );

            toast({
                variant: "destructive",
                title: uploadErrorMsg,
            });
        },
        [toast, uploadErrorMsg]
    );

    return (
        <div className="flex justify-center">
            <div className="md:min-w-[590px] flex flex-col gap-4">
                <Tabs defaultValue={method} className="w-full">
                    <TabsList className="w-full">
                        {superIdDecodeMethods.map((method) => (
                            <TabsTrigger
                                key={method.name}
                                value={method.name}
                                style={{
                                    width: "-webkit-fill-available",
                                }}
                            >
                                {method.translation}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {superIdDecodeMethods.map((method) => (
                        <TabsContent key={method.name} value={method.name}>
                            <Content
                                method={method.name}
                                handleSecretDetected={handleSecretDetected}
                                handleErrorDetected={handleErrorDetected}
                            />
                        </TabsContent>
                    ))}
                </Tabs>

                <div>{secret ? <ChallengeSolver secret={secret} /> : null}</div>
            </div>
        </div>
    );
}
