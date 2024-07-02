"use client";

import { Button } from "@/src/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { ReactElement } from "react";

interface Props {
    headingText: string;
    dateText: string;
    actionBtnContent?: ReactElement;
    onActionBtnClick?: () => void;
}

export default function TextAndActionContainer({
    dateText,
    headingText,
    actionBtnContent,
    onActionBtnClick,
}: Props) {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <div className="">
                    <h3 className="font-semibold text-sm">{headingText}</h3>
                </div>
                <div className="flex text-slate-500">
                    <div className="flex justify-center items-center me-1">
                        <Calendar className="w-4 h-4" />
                    </div>
                    {dateText}
                </div>
            </div>
            {actionBtnContent ? (
                <div>
                    <Button
                        className="rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={onActionBtnClick}
                    >
                        {actionBtnContent}
                    </Button>
                </div>
            ) : null}
        </div>
    );
}
