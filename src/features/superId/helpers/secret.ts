export const isValidSuperIdSecret = (secret: string) => {
    return secret.indexOf("=superID=") !== -1;
};
