"use client";

import { ReactNode } from "react";
import AppSidebar from "@/src/application/layout/Sidebar/AppSidebar";
import AppTopBar from "@/src/application/layout/Topbar/AppTopBar";
import { Inter } from "@next/font/google";
import ElectronClearDragBar from "@/src/application/layout/ElectronBar/ElectronClearDragBar";

const interFont = Inter({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
});

interface ApplicationLayoutProps {
    children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
    // TODO: CHANGE PLUGIN REF
    // console.log(
    //     SudoBridge.echo({
    //         value: "TEST!",
    //     })
    // );
    return (
        <>
            <ElectronClearDragBar />
            <main
                className={`${interFont.className}`}
                style={{ height: "calc(100vh - 40px)" }}
            >
                <div className="flex flex-col w-full">
                    <AppTopBar />
                    <div className="flex">
                        <AppSidebar />
                        <div className={"w-full px-4"}>{children}</div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ApplicationLayout;
