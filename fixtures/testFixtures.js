import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProductCardComponent } from '../components/ProductCardComponent.js';

import logger from '../utils/Logger.js';
import { config } from '../config/configurationManager.js';

export const test = base.extend({

    logger: async ({}, use) => {
        await use(logger);
    },

    config: async ({}, use) => {
        await use(config);
    },

    loginPage: async ({ page, logger ,config}, use) => {

        const loginPage = new LoginPage(
            page,
            logger,
            config
        );

        await use(loginPage);
    },

    dashboardPage: async ({ page, logger }, use) => {

        const dashboardPage = new DashboardPage(
            page,
            logger
        );

        await use(dashboardPage);
    },
    productCardComponent: async ({ page, logger }, use) => {

        const productCardComponent = new ProductCardComponent(
            page,
            logger
        );

        await use(productCardComponent);
    }

});


    



export { expect } from '@playwright/test';