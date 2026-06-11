import { Locator, Page } from "playwright";


export class HomePage {
    readonly page: Page;
    readonly singInButton: Locator;
    readonly singUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.singInButton = page.getByRole("button", {name: 'Sign in'});
        this.singUpButton = page.getByRole('button', {name: 'Sign up'});
    }

    async goToLoginPage() {
        await this.singInButton.click();
    }

    async goToRegistrationPage() {
        await this.singUpButton.click();
    }
}