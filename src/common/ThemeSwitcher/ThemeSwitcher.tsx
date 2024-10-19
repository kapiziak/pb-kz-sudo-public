import { Button } from "@/src/components/ui/button";
import useTheme from "@/src/hooks/ui/useTheme";
import { Moon, Sun } from "lucide-react";

// type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

const ThemeSwitcher = () => {
    // const { toggleColorMode } = useColorMode();
    // const text = useColorModeValue("dark", "light");
    // const SwitchIcon = useColorModeValue(HalfMoon, LightBulbOn);

    // const colorMode = "light";

    const { setTheme, toggleTheme, theme } = useTheme();

    const SwitchIcon = theme === "light" ? <Sun /> : <Moon />;

    const handleChangeTheme = () => {
        toggleTheme();
    };

    return (
        <Button
            variant={"ghost"}
            onClick={handleChangeTheme}
            data-testid="theme-switcher-btn"
        >
            {SwitchIcon}
        </Button>
    );
};

export default ThemeSwitcher;
