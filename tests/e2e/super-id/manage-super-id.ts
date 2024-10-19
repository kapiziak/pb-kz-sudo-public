import { expect } from "@playwright/test";
import test from "../../fixtures/test";

test.describe("Super Id", () => {
    test.beforeEach(async ({ loginPage, superIdPage }) => {
        await loginPage.loginToDemoAccount();
    });

    test.afterEach(async ({ loginPage, superIdPage }) => {
        await superIdPage.invokeSuperId();
    });

    test("should create super id and after each - invoke", async ({
        loginPage,
        superIdPage,
    }) => {
        await superIdPage.goto();

        await superIdPage.createSuperId();
    });

    test("should change a QR code after changing a PIN", async ({
        page,
        superIdPage,
    }) => {
        await superIdPage.goto();

        await superIdPage.createSuperId();

        const qrCodeUrl = await superIdPage.getQrCodeUrl();

        await superIdPage.changePin();

        await page.goto("/");
        await superIdPage.goto();

        const newQrCodeUrl = await superIdPage.getQrCodeUrl();

        expect(qrCodeUrl).not.toBe(newQrCodeUrl);
        // await superIdPage.changePin();
    });
});
