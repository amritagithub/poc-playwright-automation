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
        logger,
        config
    }) => {

        logger.info(
            'Starting add product to cart test'
        );

        await loginPage.navigate();

        await loginPage.login(
            config.username,
            config.password
        );

        

        await expect(
            dashboardPage.products.first()
        ).toBeVisible();

        await productCardComponent
            .addProductToCart(
                'ZARA COAT 3'
            );

        logger.info(
            'Add product to cart test completed'
        );
    }
);