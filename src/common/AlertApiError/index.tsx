import { components } from "@/src/api/v1";
import Translation from "@/src/application/lang/client/Translation";
import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
    error?: components["schemas"]["ApiError"]["data"] | null;
}

export default function AlertApiError({ error = null }: Props) {
    function prepareErrorReadableMessage() {
        if (!error) {
            return "";
        }

        if (error.message) {
            return error.message;
        }

        return "";
    }

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                <Translation
                    name="common.alertapierror.text"
                    variables={[prepareErrorReadableMessage()]}
                />
            </AlertDescription>
        </Alert>
    );
}
