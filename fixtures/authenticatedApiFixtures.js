import { test as base } from './testFixtures.js';
import { authConfig } from '../config/authConfig.js';
import { AuthTokenReader } from '../utils/AuthTokenReader.js';
import { ApiClient } from '../api/ApiClient.js';

export const test = base.extend({
    authenticatedApiClient: async ({ playwright, logger }, use) => {
        const token = AuthTokenReader.read(
            authConfig.storageStatePath
        );

        const requestContext = await playwright.request.newContext({
            extraHTTPHeaders: {
                Authorization: token
            }
        });

        try {
            const apiClient = new ApiClient(requestContext, logger);
            await use(apiClient);
        } finally {
            await requestContext.dispose();
        }
    }
});

export { expect } from '@playwright/test';