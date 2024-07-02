import QuickMenu from "@/src/application/layout/Topbar/QuickMenu/QuickMenu";
import LogoSection from "@/src/application/layout/Topbar/LogoSection/LogoSection";
//
// const Topbar = styled(Box, {
//   baseStyle: {
//     backgroundColor: "gray.700",
//   },
// });

const AppTopBar = () => {
    return (
        <div className="w-full p-3">
            <div className="flex justify-between">
                <LogoSection />
                <QuickMenu />
            </div>
        </div>
    );
};

export default AppTopBar;
