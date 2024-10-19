import test from "../../fixtures/test";

test.describe("Top bar", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.loginToDemoAccount();
    });
    test("should show the user login", async ({ page, loginPage }) => {
        await page.getByText("Hi,").waitFor();
    });

    test("should open quick menu on click", async ({ page, browserName }) => {
        if (browserName === "firefox") {
            test.skip();
        }

        await page
            .getByTestId("settings-dropdown")
            .getByRole("button")
            .nth(1)
            .click();
        await page.waitForSelector("text=Settings");
    });

    test("should toggle light/dark mode", async ({ page }) => {
        await page.getByTestId("theme-switcher-btn").click();
        await page.waitForSelector('body[class*="dark"]');

        await page.getByTestId("theme-switcher-btn").click();
        await page.waitForSelector('body:not([class*="dark"])');
    });

    test("should change language", async ({ page, browserName }) => {
        if (browserName === "firefox") {
            test.skip();
        }

        await page.goto("/pl");
        await page.getByText("Witaj,").waitFor();
    });
});
