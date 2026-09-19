import { defineConfig, devices } from '@playwright/test';
import { config } from './config/configurationManager.js';

export default defineConfig({

    // Discover both tests/ and globalSetup/
    testDir: '.',

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
    },

    projects: [
    {
        name: 'setup',
        testMatch: '**/globalSetup/auth.setup.js',
        use: {
            ...devices['Desktop Chrome']
        }
    },

    {
        name: 'chromium',
        testMatch: '**/tests/authenticated/**/*.spec.js',
        use: {
            ...devices['Desktop Chrome']
        },
        dependencies: ['setup']
    },

    {
        name: 'chromium-unauthenticated',
        testMatch: [
            '**/tests/unauthenticated/**/*.spec.js'
        ],
        use: {
            ...devices['Desktop Chrome'],
            storageState: {
                cookies: [],
                origins: []
            }
        }
    },

    {
        name: 'firefox',
        testMatch: '**/tests/authenticated/**/*.spec.js',
        use: {
            ...devices['Desktop Firefox']
        },
        dependencies: ['setup']
    },

    {
        name: 'webkit',
        testMatch: '**/tests/authenticated/**/*.spec.js',
        use: {
            ...devices['Desktop Safari']
        },
        dependencies: ['setup']
    }
],
});