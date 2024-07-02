import Translation from "@/src/application/lang/client/Translation";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { isValidSuperIdSecret } from "@/src/features/superId/helpers/secret";
import { Decoder } from "@nuintun/qrcode";
import { ChangeEvent } from "react";
import MethodProps from "../method-props";

const qrcode = new Decoder();

export default function ManualFileScanMethod({
    onSecretDetected,
    onDetectError,
}: MethodProps) {
    async function handleUploadFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target?.files?.[0]) {
            onDetectError?.("io-error");
            return;
        }

        let detectedSecret;

        try {
            detectedSecret = (
                await qrcode.scan(URL.createObjectURL(e.target.files[0]))
            ).data;
        } catch (e) {
            console.error(e);
            onDetectError?.("io-error");
            return;
        }

        if (isValidSuperIdSecret(detectedSecret)) {
            onSecretDetected?.(detectedSecret);
        } else {
            onDetectError?.("invalid-secret");
        }
    }

    return (
        <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="picture">
                <Translation name="features.superId.decodeForm.chooseFileLabel" />{" "}
            </Label>
            <Input id="picture" type="file" onChange={handleUploadFile} />
        </div>
    );
}
