import { Locator, Page } from "playwright";


export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder('Email');
        this.password = page.getByPlaceholder('Password');
        this.continueButton = page.getByRole('button', {name: 'Sign In'});
    }

    async enterUserName(username: string) {
        await this.username.fill(username);
    }

    async enterPassword(password: string) {
        await this.password.fill(password);
    }

    async clickSignInButton() {
        await this.continueButton.click();
    }

    async login(credentials: {username?: string, password?: string}) {
        if (credentials.username !== undefined) 
            await this.enterUserName(credentials.username);
        if(credentials.password !== undefined)
            await this.enterPassword(credentials.password);
        await this.clickSignInButton();
    }
}