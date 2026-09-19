import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {

    constructor(page, logger, config) {
        super(page, logger, config);

        this.cartProducts = '.cartSection h3';
        this.checkoutButton = 'text=Checkout';
    }
    getProduct(productName) {

    this.logger?.debug(
        `Locating product in cart: ${productName}`
    );

    return this.page
        .locator(this.cartProducts)
        .filter({
            hasText: productName
        });
}

    async verifyProductInCart(productName) {

        this.logger?.info(
            `Verifying product in cart: ${productName}`
        );

        const product = this.page
            .locator(this.cartProducts)
            .filter({
                hasText: productName
            });

        await product.waitFor({
            state: 'visible'
        });

        this.logger?.info(
            `Product found in cart: ${productName}`
        );
    }

    async isProductPresent(productName) {

        const product = this.page
            .locator(this.cartProducts)
            .filter({
                hasText: productName
            });

        return await product.isVisible();
    }

    async proceedToCheckout() {

        this.logger?.info(
            'Proceeding to checkout'
        );

        await this.click(
            this.checkoutButton
        );
    }
}