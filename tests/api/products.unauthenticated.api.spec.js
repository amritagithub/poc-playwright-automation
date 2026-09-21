import { test, expect } from '../../fixtures/testFixtures.js';
import { ProductPayloadFactory } from '../../testdata/factories/ProductPayloadFactory.js';

test('should reject a product-list request without authorization', async ({
    apiClient,
    config
}) => {
    // Arrange
    const payload = ProductPayloadFactory.create();

    // Act: The regular apiClient does not attach an Authorization header.
    const response = await apiClient.post(
        `${config.apiBaseUrl}/product/get-all-products`,
        payload
    );

    // Assert
    expect(response.status()).toBe(401);
});