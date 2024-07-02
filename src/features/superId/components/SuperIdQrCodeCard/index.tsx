"use client";

import useTranslation from "@/src/application/lang/client/useTranslation";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Download } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import InfoCardWithAction from "../InfoCardWithAction";

interface Props {
    secret: string;
    validTo?: string | number;
}

const size = 300;
const color = "#333";
const dotsStyle = "rounded";
const cornerStyle = "dot";
const cornerSquareStyle = "extra-rounded";

export default function SuperIdQrCodeCard({ secret }: Props) {
    const [mediaSrc, setMediaSrc] = useState<string>("");

    const lang = useSelector(appSelectLanguage);

    const qrHeadingTranslation = useTranslation({
        lang,
        name: "features.superId.qrCard.heading",
    });

    const qrSubheadingTranslation = useTranslation({
        lang,
        name: "features.superId.qrCard.subheading",
    });

    const qrCode = useMemo(async () => {
        const QRCodeStyling = await import("qr-code-styling");

        return new QRCodeStyling.default({
            width: size,
            height: size,
            data: secret,
            dotsOptions: {
                color,
                type: dotsStyle,
            },
            qrOptions: {
                errorCorrectionLevel: "L",
            },
            cornersDotOptions: {
                color,
                type: cornerStyle,
            },
            cornersSquareOptions: {
                color,
                type: cornerSquareStyle,
            },
            backgroundOptions: {
                color: "#fff",
            },
        });
    }, [secret]);

    useEffect(() => {
        async function generateQRCode() {
            (await qrCode).getRawData("png").then((data) => {
                if (!data) return;

                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    setMediaSrc(base64data as string);
                };
            });
        }
        generateQRCode();
    }, [qrCode]);

    const handleDownload = useCallback(async () => {
        (await qrCode).download({
            name: "superid-qr-code",
            extension: "png",
        });
    }, [qrCode]);

    return (
        <InfoCardWithAction
            infoHeadingText={qrHeadingTranslation}
            infoDateText={qrSubheadingTranslation}
            actionBtnContent={<Download className="w-4 h-4" />}
            mediaType="image"
            mediaSrc={mediaSrc}
            mediaAlt="QR Code"
            mediaDimensions={{
                width: 300,
                height: 300,
            }}
            onActionBtnClick={handleDownload}
        />
    );
}
