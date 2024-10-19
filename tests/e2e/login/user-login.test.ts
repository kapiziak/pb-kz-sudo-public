import test from "../../fixtures/test";

test.describe("User login", () => {
    test("should be redirected if is not logged in", async ({ page }) => {
        await page.goto("/");
        await page.waitForURL("/en/login");
    });

    test("should login with valid credentials", async ({ page, loginPage }) => {
        await loginPage.goto();

        await loginPage.fillLoginForm();
        await loginPage.submitLoginForm();

        await page.waitForURL("/en");
    });

    test("should show error with invalid credentials", async ({
        loginPage,
    }) => {
        await loginPage.goto();

        await loginPage.fillLoginForm(false);
        await loginPage.submitLoginForm();

        await loginPage.waitForLoginError();
    });
});
