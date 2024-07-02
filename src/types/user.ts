import { components } from "@/src/api/v1";

type TUser = Omit<components["schemas"]["User"], "role" | "profile"> & {
    role: string;
};

type TUserWithProfile = TUser & {
    profile: components["schemas"]["Profile"];
};

export default TUser;
