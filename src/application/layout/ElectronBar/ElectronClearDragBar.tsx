import styled from "styled-components";

const ClearBar = styled.div`
    -webkit-app-region: drag;
    height: 40px;
    width: 100%;
`;

export default function ElectronClearDragBar() {
    if (
        !process.env.NEXT_PUBLIC_PLATFORM ||
        !["electron", "ios"].includes(process.env.NEXT_PUBLIC_PLATFORM)
    )
        return null;

    return <ClearBar />;
}
