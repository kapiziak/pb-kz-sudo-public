import { HTMLAttributes, ReactElement } from "react";

type Props = {
    children: ReactElement | string;
} & HTMLAttributes<HTMLDivElement>;

export function TypographyH1({ children, className, ...props }: Props) {
    return (
        <h1
            className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
            {...props}
        >
            {children}
        </h1>
    );
}

export function TypographyH2({
    children,
    as,
    className,
    ...props
}: Props & { as?: "h1" }) {
    if (as === "h1") {
        return (
            <h1
                className={`scroll-m-20 pb-2 text-3xl font-semibold transition-colors first:mt-0 ${className}`}
                {...props}
            >
                {children}
            </h1>
        );
    }

    return (
        <h2
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${className}`}
            {...props}
        >
            {children}
        </h2>
    );
}
export function TypographyH3({ children, className, ...props }: Props) {
    return (
        <h3
            className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
        >
            {children}
        </h3>
    );
}
export function TypographyH4({ children }: Props) {
    return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h4>
    );
}

export function TypographyP({ className, children }: Props) {
    return (
        <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
            {children}
        </p>
    );
}
export function TypographyInlineCode({ children }: Props) {
    return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
        </code>
    );
}

export function TypographyLead({ children }: Props) {
    return <p className="text-xl text-muted-foreground">{children}</p>;
}

export function TypographyLarge({ children }: Props) {
    return <div className="text-lg font-semibold">{children}</div>;
}
export function TypographySmall({ children }: Props) {
    return (
        <small className="text-sm font-medium leading-none">{children}</small>
    );
}
export function TypographyMuted({ children }: Props) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}
