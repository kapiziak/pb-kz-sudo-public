"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { Calendar, Download } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";
import MediaContainer from "./MediaContainer/MediaContainer";
import TextAndActionContainer from "./TextAndActionContainer/TextAndActionContainer";

interface Props {
    infoHeadingText: string;
    infoDateText: string;
    actionBtnContent?: ReactElement;
    onActionBtnClick?: () => void;
    mediaType: "image";
    mediaSrc: string;
    mediaAlt: string;
    mediaDimensions: {
        width: number;
        height: number;
    };
}

export default function InfoCardWithAction({
    infoHeadingText,
    infoDateText,
    mediaAlt,
    mediaDimensions,
    mediaSrc,
    mediaType,
    actionBtnContent,
    onActionBtnClick,
}: Props) {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4 p-4">
                <MediaContainer
                    src={mediaSrc}
                    width={mediaDimensions.width}
                    height={mediaDimensions.height}
                    alt={mediaAlt}
                />
                <TextAndActionContainer
                    headingText={infoHeadingText}
                    dateText={infoDateText}
                    actionBtnContent={actionBtnContent}
                    onActionBtnClick={onActionBtnClick}
                />
            </CardContent>
        </Card>
    );
}
