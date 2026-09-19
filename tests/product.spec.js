import { test, expect } from '../fixtures/testFixtures.js';

test('Add product to cart', async ({
    authenticatedPage,
    productCardComponent,
    cartPage,
    jsonReader,
    logger
}) => {

    const productData = jsonReader.read(
        'common/productData.json'
    );

    const productName = jsonReader.getRequiredValue(
        productData,
        ['addToCart', 'productName']
    );

    logger.info('Starting add product to cart test');

    // Authentication has already been completed by the fixture.

    await productCardComponent.addProductToCart(productName);

    await authenticatedPage
        .locator('[routerlink="/dashboard/cart"]')
        .click();

    await expect(
        cartPage.getProduct(productName)
    ).toBeVisible();

    logger.info(
        `Product verified successfully in cart: ${productName}`
    );
});