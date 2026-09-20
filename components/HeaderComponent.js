import { BasePage } from '../pages/BasePage.js';

export class HeaderComponent extends BasePage {

    constructor(page, logger, config) {
        super(page, logger, config);

        this.cartButton = '[routerlink="/dashboard/cart"]';

        this.ordersButton = '[routerlink="/dashboard/myorders"]';
    }

    async goToCart() {

        this.logger?.info('Navigating to Cart');

        await this.click(this.cartButton);
    }

    async goToOrders() {

        this.logger?.info('Navigating to Orders');

        await this.click(this.ordersButton);
    }
}