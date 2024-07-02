import ToggleSidebar from "@/src/application/layout/Sidebar/Controls/ToggleSidebar/ToggleSidebar";

const SidebarControls = () => {
    return (
        <div
            className="flex"
            style={{ position: "absolute", left: 5, bottom: 5 }}
        >
            <ToggleSidebar />
        </div>
    );
};

export default SidebarControls;
