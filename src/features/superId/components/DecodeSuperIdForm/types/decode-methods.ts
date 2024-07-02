export type TSuperIdDecodeMethod = "manual" | "camera" | "scanFile";

export const superIdDecodeMethods: Array<{
    name: TSuperIdDecodeMethod;
    translation: string;
}> = [
    {
        name: "manual",
        translation: "Manual",
    },
    {
        name: "camera",
        translation: "Camera",
    },
    {
        name: "scanFile",
        translation: "Scan file",
    },
];
