import Translation from "@/src/application/lang/client/Translation";
import IconButton from "@/src/components/ui/icon-button";
import { isValidSuperIdSecret } from "@/src/features/superId/helpers/secret";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Decoder } from "@nuintun/qrcode";
import { CameraIcon } from "lucide-react";
import MethodProps from "../method-props";

const qrcode = new Decoder();

export default function TakePictureMethod({
    onDetectError,
    onSecretDetected,
}: MethodProps) {
    async function takePicture() {
        let image;

        try {
            image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri,
            });
        } catch (e) {
            console.error(e);
            onDetectError?.("io-error");
            return;
        }

        var imageUrl = image.webPath;

        console.log(imageUrl);

        if (!imageUrl) {
            console.error(`[TakePictureMethod] Image URL is null`);
            onDetectError?.("io-error");
            return;
        }

        let detectedSecret;

        try {
            detectedSecret = (await qrcode.scan(imageUrl)).data;
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
        <IconButton onClick={takePicture} icon={<CameraIcon />}>
            <Translation name="features.superId.decodeForm.camera.takePicture" />
        </IconButton>
    );
}
