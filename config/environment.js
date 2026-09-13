import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const environmentName = process.env.TEST_ENV || 'qa';

const envPath = path.resolve(
    __dirname,
    `../.env.${environmentName}`
);

const result = dotenv.config({
    path: envPath
});

if (result.error) {
    throw new Error(
        `Unable to load environment configuration: ${envPath}`
    );
}

export const environment = {
    name: environmentName,
    baseUrl: process.env.BASE_URL,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    browser: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS !== 'false',
    defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 30000),
    actionTimeout: Number(process.env.ACTION_TIMEOUT || 15000),
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT || 30000),
    expectTimeout: Number(process.env.EXPECT_TIMEOUT || 10000),
    workers: Number(process.env.WORKERS || 2),
    retries: Number(process.env.RETRIES || 1)
};