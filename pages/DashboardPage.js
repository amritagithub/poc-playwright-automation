import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {

    constructor(page, logger) {

        super(page, logger);

        this.products = page.locator('.card-body');
        this.ordersButton = page.getByRole(
            'button',
            { name: 'ORDERS' }
        );

        this.cartButton = page.getByRole(
            'button',
            { name: /Cart/i }
        );
    }

    async isDashboardDisplayed() {

        this.logger?.info(
            'Validating dashboard is displayed'
        );

        return await this.products
            .first()
            .isVisible();
    }

    async getProductCount() {

        const count = await this.products.count();

        this.logger?.info(
            `Dashboard product count: ${count}`
        );

        return count;
    }

    async goToOrders() {

        this.logger?.info(
            'Navigating to Orders'
        );

        await this.ordersButton.click();
    }

    async goToCart() {

        this.logger?.info(
            'Navigating to Cart'
        );

        await this.cartButton.click();
    }
}