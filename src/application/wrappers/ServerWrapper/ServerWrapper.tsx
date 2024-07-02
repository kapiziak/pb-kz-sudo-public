import { ReactNode } from "react";

interface ServerWrapperProps {
    children: ReactNode;
}

export function ServerWrapper({ children }: ServerWrapperProps) {
    return <>{children}</>;
}
