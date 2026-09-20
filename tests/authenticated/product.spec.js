import { test, expect } from '../../fixtures/authenticatedFixtures.js';

test('Add product to cart', async ({
    dashboardPage,
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

    await dashboardPage.navigate();

    await dashboardPage.verifyDashboardDisplayed();

    await productCardComponent.addProductToCart(productName);

    await dashboardPage.goToCart();

    await expect(
        cartPage.getProduct(productName)
    ).toBeVisible();

    logger.info(
        `Product verified successfully in cart: ${productName}`
    );
});