import { type Page } from "@playwright/test";
import * as data from "../common-data.json";

export class LoginPage {
    readonly page: Page;
    readonly loginData: { username: string; password: string };

    constructor(page: Page) {
        this.page = page;
        this.loginData = {
            username: data.testLogin,
            password: data.testPassword,
        };
    }

    async goto() {
        await this.page.goto("/en/login");
    }

    async fillLoginForm(validData = true) {
        await this.page.getByTestId("username").click();
        await this.page.getByTestId("username").fill(this.loginData.username);
        await this.page.getByTestId("password").click();
        await this.page
            .getByTestId("password")
            .fill(validData ? this.loginData.password : "amogus");
    }

    async submitLoginForm() {
        await this.page.getByTestId("login-submit").click();
    }

    async waitForLoginError() {
        await this.page.waitForSelector("text=Invalid username or password.");
    }

    async loginToDemoAccount() {
        await this.goto();
        await this.fillLoginForm();
        await this.submitLoginForm();

        await this.page.waitForURL("/en");
    }
}
