import SuperIdService from "@/src/api/services/superId-service";
import { paths } from "@/src/api/v1";
import { FetchResponse } from "openapi-fetch";
import { useMutation } from "react-query";

const superIdService = new SuperIdService();

export function useSendChallenge() {
    return useMutation<
        FetchResponse<paths["/api/super-id/challenge/"]["post"]>,
        unknown,
        {
            challengeId: string;
            pin: string;
        }
    >({
        mutationFn: (variables) =>
            superIdService.sendChallenge(variables.challengeId, variables.pin),
    });
}
