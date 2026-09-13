import { defineConfig } from '@playwright/test';
import { config } from './config/configurationManager.js';

export default defineConfig({

    testDir: './tests',

    timeout: config.defaultTimeout,

    expect: {
        timeout: config.expectTimeout
    },

    workers: config.workers,

    retries: config.retries,

    use: {
        baseURL: config.baseUrl,
        headless: config.headless,
        actionTimeout: config.actionTimeout,
        navigationTimeout: config.navigationTimeout
    }
});