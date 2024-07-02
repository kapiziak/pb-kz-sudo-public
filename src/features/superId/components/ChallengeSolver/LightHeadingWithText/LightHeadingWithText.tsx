interface Props {
    heading: React.ReactNode | string;
    content: React.ReactNode | string;
}

export default function LightHeadingWithText({ content, heading }: Props) {
    return (
        <>
            <h3 className="font-light uppercase">{heading}</h3>
            {typeof content === "string" ? (
                <span className="font-bold">{content}</span>
            ) : (
                content
            )}
        </>
    );
}
