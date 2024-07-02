interface MethodProps {
    onSecretDetected?(secret: string): void;
    onDetectError?(err: "invalid-secret" | "io-error"): void;
}

export default MethodProps;
