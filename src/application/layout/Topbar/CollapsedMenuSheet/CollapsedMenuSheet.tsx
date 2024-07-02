import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { Menu } from "lucide-react";
import SidebarMenu from "@/src/application/layout/Sidebar/Menu/SidebarMenu";

export default function CollapsedMenuSheet() {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant={"ghost"} className="me-2">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetHeader className="mb-4">SUDO</SheetHeader>

                <SidebarMenu variant={"mobile"} />
            </SheetContent>
        </Sheet>
    );
}
