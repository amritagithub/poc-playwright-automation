import { test as base } from '@playwright/test';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProductCardComponent } from '../components/ProductCardComponent.js';
import { CartPage } from '../pages/CartPage.js';

import logger from '../utils/Logger.js';
import { config } from '../config/configurationManager.js';
import { JsonReader } from '../utils/JsonReader.js';
import { HeaderComponent } from '../components/HeaderComponent.js';
import { ApiClient } from '../api/ApiClient.js';
export const test = base.extend({

    logger: async ({}, use) => {
        await use(logger);
    },

    config: async ({}, use) => {
        await use(config);
    },

    loginPage: async ({ page, logger, config }, use) => {

        const loginPage = new LoginPage(
            page,
            logger,
            config
        );

        await use(loginPage);
    },
    // API Client fixture to be used in tests
    apiClient: async ({ request, logger }, use) => {
    const apiClient = new ApiClient(request, logger);

    await use(apiClient);
},
    headerComponent: async ({ page, logger, config }, use) => {

    const headerComponent = new HeaderComponent(
        page,
        logger,
        config
    );

    await use(headerComponent);
},

    dashboardPage: async ({ page, logger, config }, use) => {

        const dashboardPage = new DashboardPage(
            page,
            logger,
            config
        );

        await use(dashboardPage);
    },
    authenticatedPage: async (
    { page, loginPage, dashboardPage, config, logger },
    use
) => {
    logger.info('Starting authentication setup');

    await loginPage.navigate();

    await loginPage.login(
        config.username,
        config.password
    );

    await dashboardPage.verifyDashboardDisplayed();

    logger.info('Authentication completed successfully');

    await use(page);
},

    productCardComponent: async ({ page, logger, config }, use) => {

        const productCardComponent = new ProductCardComponent(
            page,
            logger,
            config
        );

        await use(productCardComponent);
    },

    cartPage: async ({ page, logger, config }, use) => {

        const cartPage = new CartPage(
            page,
            logger,
            config
        );

        await use(cartPage);
    },

    jsonReader: async ({}, use) => {

        const projectRoot = fileURLToPath(
            new URL('../', import.meta.url)
        );

        const testDataDirectory = path.join(
            projectRoot,
            'testdata'
        );

        const jsonReader = new JsonReader(
            testDataDirectory
        );

        await use(jsonReader);
    },
    productData: async ({ jsonReader }, use) => {

    const data = jsonReader.read(
        'common/productData.json'
    );

    const productName = jsonReader.getRequiredValue(
        data,
        ['addToCart', 'productName']
    );

    await use({
        addToCart: {
            productName
        }
    });
},
    

});

export { expect } from '@playwright/test';