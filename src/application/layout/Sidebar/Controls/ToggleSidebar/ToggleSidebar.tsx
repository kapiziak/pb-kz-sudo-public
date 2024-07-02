import { useDispatch, useSelector } from "react-redux";
import {
  appSelectSidebarCollapsed,
  appToggleSidebar,
} from "@/src/application/store/reducers/appSlice";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// const ControlButton = styled(IconButton, {
//   baseStyle: {
//     backgroundColor: "transparent",
//   },
// });

const ToggleSidebar = () => {
  //appSetSidebarCollapsed

  const dispatch = useDispatch();

  const isCollapsed = useSelector(appSelectSidebarCollapsed);

  const handleToggleSidebar = () => {
    dispatch(appToggleSidebar());
  };

  const correctIcon = isCollapsed ? <ArrowLeftToLine /> : <ArrowRightToLine />;

  //
  // const correctButton = useMemo(
  //   () =>
  //     isCollapsed ? (
  //       <ControlButton
  //         aria-label={"Toggle Sidebar"}
  //         icon={<SidebarExpand />}
  //         onClick={() => handleToggleSidebar(false)}
  //       />
  //     ) : (
  //       <ControlButton
  //         aria-label={"Toggle Sidebar"}
  //         icon={<SidebarCollapse />}
  //         onClick={() => handleToggleSidebar(true)}
  //       />
  //     ),
  //   [isCollapsed]
  // );

  return (
    <Button variant="ghost" onClick={handleToggleSidebar}>
      {correctIcon}
    </Button>
  );
};

export default ToggleSidebar;
