"use client";

import SuperIdQrCodeCard from "@/src/features/superId/components/SuperIdQrCodeCard";

export default function SuperIdShortcut() {
    return (
        <div className="row-start-1 row-span-3">
            <SuperIdQrCodeCard secret="twoja stara" />
        </div>
    );
}
