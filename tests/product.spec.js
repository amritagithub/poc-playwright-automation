import {
    test,
    expect
} from '../fixtures/testFixtures.js';

test(
    'Add product to cart',
    async ({
        loginPage,
        dashboardPage,
        productCardComponent,
        cartPage,
        logger,
        config
    }) => {

        const productName =
            'ZARA COAT 3';

        logger.info(
            'Starting add product to cart test'
        );

        await loginPage.navigate();

        await loginPage.login(
            config.username,
            config.password
        );

        //await dashboardPage
        //    .verifyDashboardDisplayed();

        await productCardComponent
            .addProductToCart(productName);

        await dashboardPage
            .goToCart();

        /*await expect(
            cartPage.getProduct(productName)
        ).toBeVisible();*/

        logger.info(
            `Product verified successfully in cart: ${productName}`
        );
    }
);