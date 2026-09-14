import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {

    constructor(page, logger, config) {

        super(page, logger, config);

        this.username = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator('#login');

    }

    async login(username, password) {

        this.logger.info('Starting login');

        await this.username.fill(username);

        this.logger.debug('Username entered');

        await this.password.fill(password);

        this.logger.debug('Password entered');

        await this.loginButton.click();

        this.logger.info('Login button clicked');
    }
    
}