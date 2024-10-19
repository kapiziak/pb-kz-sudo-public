import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login-page";
import { SuperIdPage } from "./pages/super-id-page";

const test = base.extend<{ loginPage: LoginPage; superIdPage: SuperIdPage }>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    superIdPage: async ({ page }, use) => {
        await use(new SuperIdPage(page));
    },
});

export default test;
