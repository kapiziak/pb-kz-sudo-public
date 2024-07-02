import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import useTheme from "@/src/hooks/ui/useTheme";

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
    <Button variant={"ghost"} onClick={handleChangeTheme}>
      {SwitchIcon}
    </Button>
  );
};

export default ThemeSwitcher;
