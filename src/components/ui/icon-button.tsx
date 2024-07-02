import { Button, ButtonProps } from "@/src/components/ui/button";
import { cloneElement, ReactElement } from "react";

export type IconButtonProps = ButtonProps & {
    icon: ReactElement;
};

const IconButton = ({ icon, children, ...props }: IconButtonProps) => {
    return (
        <Button {...props}>
            {cloneElement(icon, {
                className: `${children ? "mr-2" : ""} h-4 w-4`,
            })}
            {children}
        </Button>
    );
};

export default IconButton;
