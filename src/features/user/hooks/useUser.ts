import { useCurrentUserInfo } from "@/src/api/hooks/auth/me";
import { useEffect, useState } from "react";
import User from "@/src/types/user";

export default function useUser() {
    const [user, setUser] = useState<User | null>(null);

    const { data, isSuccess } = useCurrentUserInfo();

    useEffect(() => {
        function processData() {
            if (!data?.data?.data) return;

            setUser(data.data.data.user);
        }

        if (isSuccess) processData();
    }, [data, isSuccess]);

    return {
        user,
        isLoggedIn: !!user,
        username: user?.email,
    };
}
