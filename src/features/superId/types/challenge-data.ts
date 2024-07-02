import { components } from "@/src/api/v1";
import TUser from "@/src/types/user";

export type TChallengeData = {
    challengeId: string;
    studentId?: string;
    identityCardId?: string;
    userId: number;
};

export type TChallengeSolvedData = {
    authorizations: Array<
        Omit<components["schemas"]["Authorization"], "scopeFacility"> & {
            scopeFacility: components["schemas"]["Facility"][];
        }
    >;
    user: Pick<TUser, "id" | "email" | "role">;
    profile: components["schemas"]["Profile"] | null;
};
