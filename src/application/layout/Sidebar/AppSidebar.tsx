import SidebarMenu from "@/src/application/layout/Sidebar/Menu/SidebarMenu";
import SidebarControls from "@/src/application/layout/Sidebar/Controls/SidebarControls";
import { useSelector } from "react-redux";
import { appSelectSidebarCollapsed } from "@/src/application/store/reducers/appSlice";
import { useMemo } from "react";

// const Sidebar = styled(Box, {
//   baseStyle: {
//     backgroundColor: "gray.700",
//     overflow: "hidden",
//   },
// });

const AppSidebar = () => {
    const isCollapsed = useSelector(appSelectSidebarCollapsed);

    const sidebarWidth = useMemo(() => {
        return isCollapsed ? "48px" : "300px";
    }, [isCollapsed]);

    if (isCollapsed) return null;

    return (
        <div
            style={{
                width: sidebarWidth,
            }}
        >
            {/*<Flex direction={"column"} justifyContent={"space-between"} h={"100%"}>*/}
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col">
                    <SidebarMenu />
                </div>
                <div
                    className={`flex flex-col justify-end ${
                        isCollapsed ? "p-1" : "p-2"
                    }`}
                >
                    <SidebarControls />
                </div>
            </div>
        </div>
    );
};

export default AppSidebar;
