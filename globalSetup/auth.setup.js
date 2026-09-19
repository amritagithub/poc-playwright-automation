import { test as setup, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import logger from '../utils/Logger.js';
import { config } from '../config/configurationManager.js';
import { authConfig } from '../config/authConfig.js';

const projectRoot = fileURLToPath(
    new URL('../', import.meta.url)
);

export const authFile = path.join(
    projectRoot,
    'playwright',
    '.auth',
    'user.json'
);

setup('Authenticate and save browser state', async ({ page }) => {

    const loginPage = new LoginPage(page, logger, config);

    const dashboardPage = new DashboardPage(
        page,
        logger,
        config
    );

    await loginPage.navigate();

    await loginPage.login(
        config.username,
        config.password
    );

    await dashboardPage.verifyDashboardDisplayed();
await page.context().storageState({
    path: authConfig.storageStatePath
});

    logger.info('Authenticated browser state saved');
});