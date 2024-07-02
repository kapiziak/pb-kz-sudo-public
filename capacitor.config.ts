import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "pl.kzakrzewski.pbsudo",
    appName: "pb-kz-sudo",
    server: {
        androidScheme: "https",
        hostname: "sudo-app.azurewebsites.net",
    },
    webDir: "out",
    bundledWebRuntime: false,
};

export default config;
