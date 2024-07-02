// import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { appSelectSidebarCollapsed } from "@/src/application/store/reducers/appSlice";
import CollapsedMenuSheet from "@/src/application/layout/Topbar/CollapsedMenuSheet/CollapsedMenuSheet";
import { Lock } from "lucide-react";

const LogoSection = () => {
    const isCollapsed = useSelector(appSelectSidebarCollapsed);

    return (
        // <Box px={isCollapsed ? 2 : 3} py={isCollapsed ? 4 : 3}>
        <div className={`flex items-center ${!isCollapsed ? "px-4" : ""} py-3`}>
            {isCollapsed ? <CollapsedMenuSheet /> : null}
            <div className="flex gap-2 text-xl">
                <Lock width={"1em"} /> SUDO
            </div>
        </div>
    );
};

export default LogoSection;
