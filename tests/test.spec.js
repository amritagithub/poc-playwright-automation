import { test } from '@playwright/test';
import logger from '../utils/Logger.js';

test('Logger validation', async () => {

    logger.info('Logger test started');

    logger.debug('Debug message');

    logger.warn('Warning message');

    logger.error('Error message');

    logger.info('Logger test completed');

});