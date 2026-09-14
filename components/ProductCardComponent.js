import { BasePage } from '../pages/BasePage.js';

export class ProductCardComponent extends BasePage {

    constructor(page, logger, config) {
        super(page, logger, config);

        this.productCards = '.card-body';
    }

    async getProductCardByName(productName) {

        this.logger?.info(
            `Locating product card for: ${productName}`
        );

        return this.page
            .locator(this.productCards)
            .filter({
                hasText: productName
            });
    }

    async addProductToCart(productName) {

        this.logger?.info(
            `Adding product to cart: ${productName}`
        );

        const productCard =
            await this.getProductCardByName(
                productName
            );

        const addToCartButton =
            productCard.getByRole(
                'button',
                {
                    name: /Add To Cart/i
                }
            );

        await addToCartButton.click();

        this.logger?.info(
            `Product added to cart: ${productName}`
        );
    }

    async getProductPrice(productName) {

        const productCard =
            await this.getProductCardByName(
                productName
            );

        const price =
            await productCard
                .locator('.text-muted')
                .textContent();

        this.logger?.info(
            `Price for ${productName}: ${price}`
        );

        return price?.trim();
    }
}