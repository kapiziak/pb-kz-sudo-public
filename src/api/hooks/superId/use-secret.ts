import { FetchResponse } from "openapi-fetch";
import { useMutation, useQueryClient } from "react-query";
import SuperIdService from "../../services/superId-service";
import { paths } from "../../v1";

const superIdService = new SuperIdService();

export function useSecretSuperId() {
    return useMutation<
        FetchResponse<paths["/api/super-id/useSecret"]["post"]>,
        unknown,
        {
            secret: string;
        }
    >({
        mutationFn: (variables) => superIdService.useSecret(variables.secret),
    });
}
