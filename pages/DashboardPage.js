import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {

    constructor(page, logger, config) {
        super(page, logger, config);

        this.products = '.card-body';

        this.ordersButton = '[routerlink="/dashboard/myorders"]';

        this.cartButton = '[routerlink="/dashboard/cart"]';
    }

    async isDashboardDisplayed() {

        this.logger?.info(
            'Validating dashboard is displayed'
        );

        return await this.page
            .locator(this.products)
            .first()
            .isVisible();
    }

    async verifyDashboardDisplayed() {

        this.logger?.info(
            'Verifying dashboard is displayed'
        );

        await this.page
            .locator(this.products)
            .first()
            .waitFor({ state: 'visible' });

        this.logger?.info(
            'Dashboard displayed successfully'
        );
    }

    async getProductCount() {

        const count = await this.page
            .locator(this.products)
            .count();

        this.logger?.info(
            `Dashboard product count: ${count}`
        );

        return count;
    }

 

  
}