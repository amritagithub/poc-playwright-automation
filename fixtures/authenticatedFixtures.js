import { test as base } from './testFixtures.js';
import { authConfig } from '../config/authConfig.js';

export const test = base.extend({
    storageState: authConfig.storageStatePath
});

export { expect } from '@playwright/test';

