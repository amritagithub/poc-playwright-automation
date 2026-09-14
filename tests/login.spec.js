import { test, expect } from '../fixtures/testFixtures.js';

test('Login test', async ({ loginPage, dashboardPage,logger ,config}) => {

    logger.info('Starting login test');

await loginPage.navigate();
    await loginPage.login(
       config.username ,
        config.password
    );

    logger.info('Login test completed');
    
   await expect(
            dashboardPage.products.first()
        ).toBeVisible();
logger.info(`products are ${await dashboardPage.products.allTextContents()}`);
        logger.info(
            'Dashboard displayed successfully'
        );
});