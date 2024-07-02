import AppRouter from "@/src/application/routing/app-router";
import { appSelectLanguage } from "@/src/application/store/reducers/appSlice";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function NoSuperIdFound() {
    const lang = useSelector(appSelectLanguage);

    const router = new AppRouter(lang);

    return (
        <div
            className="w-[1160px] flex items-center justify-center h-[400px] rounded-xl mx-auto "
            style={{
                backgroundImage: `url(/assets/img/superid-placeholder.png)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Button asChild>
                <Link href={router.superId("create")}>
                    Stwórz swoje superID{" "}
                </Link>
            </Button>
        </div>
    );
}
