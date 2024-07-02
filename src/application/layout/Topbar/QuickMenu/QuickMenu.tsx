import ThemeSwitcher from "@/src/common/ThemeSwitcher/ThemeSwitcher";
import LoginButton from "@/src/features/user/components/LoginButton/LoginButton";
import styled from "styled-components";
import SettingsDropdown from "@/src/application/layout/Topbar/QuickMenu/SettingsDropdown";

const MenuItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QuickMenu = () => {
    return (
        <div className="flex gap-3">
            <MenuItem>
                <ThemeSwitcher />
            </MenuItem>
            <MenuItem>
                <LoginButton />
            </MenuItem>
            <MenuItem>
                <SettingsDropdown />
            </MenuItem>
        </div>
    );
};

export default QuickMenu;
