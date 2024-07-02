export function getImgSrcPolicy(): string {
    const policies: Array<string> = [
        `'self'`,
        `data:`,
        `blob:`,
        `https://*.ggpht.com`,
        `https://*.youtube.com`,
        `https://images.unsplash.com`,
        `https://media.tenor.com`,
        `https://storage.googleapis.com`,
        `http://localhost:3000`,
        `http://localhost:2222`,
    ];

    return policies.join(" ");
}

export function getStyleSrcElemPolicy(): string {
    const policies: Array<string> = [
        `'self'`,
        `'unsafe-inline'`,
        `https://use.typekit.net`,
        `https://p.typekit.net`,
        `https://cdn.tiny.cloud`,
    ];

    return policies.join(" ");
}

export function getFontSrcPolicy(): string {
    const policies: Array<string> = [
        `'self'`,
        `'unsafe-inline'`,
        `https://use.typekit.net`,
        `https://p.typekit.net`,
        `https://fonts.gstatic.com`,
    ];

    return policies.join(" ");
}

export function getScriptSrcPolicy(): string {
    const policies: Array<string> = [
        `'self'`,
        `'unsafe-inline'`,
        `'unsafe-eval'`,
    ];

    return policies.join(" ");
}

export function getScriptSrcElemPolicy(): string {
    const policies: Array<string> = [
        `'self'`,
        `'unsafe-inline'`,
        `https://*.google.com`,
        `https://*.youtube.com/`,
        `https://*.gstatic.com/`,
        `https://cdn.tiny.cloud`,
        `https://*.maze.co`,
    ];

    return policies.join(" ");
}

export function getConnectSrcPolicy(customScheme: string): string {
    const policies: Array<string> = [
        `'unsafe-inline'`,
        `data:`,
        `blob:`,
        `https://*.googleapis.com`,
        `https://*.googlevideo.com`,
        `https://storage.googleapis.com`,
        `https://www.youtube.com`,
        `${customScheme}://*`,
        `http://localhost:1337`,
        `http://localhost:3000`,
        `http://localhost:2222`,
        `https://sudo-app.azurewebsites.net`,
    ];

    return policies.join(" ");
}

export function getWorkerSrcPolicy(): string {
    const policies: Array<string> = [`blob:`];

    return policies.join(" ");
}

export function getMediaSrcPolicy(): string {
    const policies: Array<string> = [
        `'self'`,
        `blob:`,
        `data:`,
        `https://*.youtube.com`,
    ];

    return policies.join(" ");
}
