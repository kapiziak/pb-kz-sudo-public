import { ReactNode, useId, useMemo } from "react";
import Link from "next/link";
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";
import styled from "styled-components";

interface MenuItemProps {
    id: string;
    label: string;
    href?: string;
    icon?: ReactNode;
    children?: ReactNode;
    small?: boolean;
}

const IconWrapper = styled.div`
    svg {
        width: 1em;
        height: 1em;
    }
`;

const MenuItem = ({
    id,
    label,
    icon,
    href,
    children,
    small,
}: MenuItemProps) => {
    const randomID = useId();

    const menuLabel = useMemo(() => {
        return children ? (
            <AccordionTrigger
                className={`py-2 px-3 hover:bg-accent`}
                id={`${id}-trigger`}
            >
                <IconWrapper>{icon}</IconWrapper> {label}
            </AccordionTrigger>
        ) : href ? (
            <Link
                href={href}
                className={`py-2 px-3 flex flex-1 items-center gap-2 font-medium transition-all hover:bg-accent`}
            >
                <IconWrapper>{icon}</IconWrapper> {label}
            </Link>
        ) : (
            <div
                aria-disabled={"true"}
                className={`py-2 px-3 flex flex-1 items-center gap-2 font-medium transition-all hover:bg-accent opacity-50 cursor-not-allowed`}
            >
                <IconWrapper>{icon}</IconWrapper> {label}
            </div>
        );
    }, [children, id, icon, label, href]);

    const menuContent = useMemo(
        () =>
            children ? (
                <AccordionContent id={`${id}-content`}>
                    {children}
                </AccordionContent>
            ) : null,
        [children, id]
    );

    return (
        <AccordionItem id={id} value={id} className={`${small ? "" : "px-4"}`}>
            {menuLabel}
            {menuContent}
        </AccordionItem>
    );
};

export default MenuItem;
