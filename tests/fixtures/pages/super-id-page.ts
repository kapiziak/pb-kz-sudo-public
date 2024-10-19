import { type Page } from "@playwright/test";

export class SuperIdPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("/en/super-id");
    }

    async createSuperId() {
        await this.page.getByTestId("create-superid").click();

        await this.page.getByPlaceholder("Wpisz 4 cyfrowy kod").click();
        await this.page.getByPlaceholder("Wpisz 4 cyfrowy kod").fill("1234");
        await this.page
            .getByPlaceholder("Numer legitymacji studenckiej")
            .click();
        await this.page
            .getByPlaceholder("Numer legitymacji studenckiej")
            .fill("WI1234123");
        await this.page.getByPlaceholder("Wpisz numer dokumentu").click();
        await this.page
            .getByPlaceholder("Wpisz numer dokumentu")
            .fill("AABBCCDD1");
        await this.page.getByRole("button", { name: "Zapisz" }).click();

        await this.page.waitForSelector("text=Yours QR");
    }

    async invokeSuperId() {
        await this.page.getByTestId("revoke-superid").click();
    }

    async getQrCodeUrl() {
        const element = await this.page.getByTestId("QR-Code");

        return element.getAttribute("src");
    }

    async changePin() {
        await this.page.getByRole("button", { name: "Edit" }).click();
        await this.page
            .getByPlaceholder("The current PIN is hidden for")
            .fill("4444");
        await this.page.getByRole("button", { name: "Save" }).click();

        await this.page.isVisible("text=PIN has been changed.");
    }
}
