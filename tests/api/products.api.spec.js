//import { test, expect } from '../../fixtures/testFixtures.js';
import { test, expect } from '../../fixtures/authenticatedApiFixtures.js';
import { ProductPayloadFactory } from '../../testdata/factories/ProductPayloadFactory.js';
test('should retrieve the product list', async ({
    authenticatedApiClient,
    config,
    productData,
}) => {

    // Arrange: Use the same filter payload observed in the browser.
    const payload  = ProductPayloadFactory.create();

    // Act: Call the product-list API.
   const response = await authenticatedApiClient.post(
    `${config.apiBaseUrl}/product/get-all-products`,
    payload
);
    // Assert: Validate the HTTP response.
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    // Validate the response structure.
    expect(Array.isArray(responseBody.data)).toBe(true);
    expect(typeof responseBody.count).toBe('number');
    expect(responseBody.count).toBe(responseBody.data.length);

    // Validate the success message observed in your response.
    expect(responseBody.message).toBe(
        'All Products fetched Successfully'
    );

    // Validate the structure of each returned product.
    for (const product of responseBody.data) {
        expect(typeof product._id).toBe('string');
        expect(typeof product.productName).toBe('string');
        expect(typeof product.productPrice).toBe('number');
        expect(typeof product.productStatus).toBe('boolean');
    }





});

test('should return the product specified in test data', async ({
    authenticatedApiClient,
    config,
    productData
}) => {
    const payload = ProductPayloadFactory.create();

    const response = await authenticatedApiClient.post(
        `${config.apiBaseUrl}/product/get-all-products`,
        payload
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(Array.isArray(responseBody.data)).toBe(true);

    const expectedProductName = productData.addToCart.productName;

    const matchingProducts = responseBody.data.filter(
        product => product.productName === expectedProductName
    );

    expect(
        matchingProducts.length,
        `Expected product "${expectedProductName}" in the API response`
    ).toBeGreaterThan(0);
});


// Test to verify that the product is found in the API response and has the expected properties
test('should filter products by name', async ({
    authenticatedApiClient,
    config,
    productData
}) => {
    // Arrange
    const expectedProductName = productData.addToCart.productName;

    const payload = ProductPayloadFactory.create({
        productName: expectedProductName
    });

    // Act
    const response = await authenticatedApiClient.post(
        `${config.apiBaseUrl}/product/get-all-products`,
        payload
    );

    // Assert
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody.data)).toBe(true);

    expect(
        responseBody.data.length,
        `Expected at least one product matching "${expectedProductName}"`
    ).toBeGreaterThan(0);
    console.log('Requested product name:', expectedProductName);
console.log('Returned product names:',
    responseBody.data.map(product => product.productName)
);
    for (const product of responseBody.data) {
        expect(product.productName).toBe(expectedProductName);
    }
});

test('should return no products for a non-existent name', async ({
    authenticatedApiClient,
    config
}) => {
    // Arrange
    const payload = ProductPayloadFactory.create({
        productName: 'NON_EXISTENT_PRODUCT_987654321'
    });

    // Act
    const response = await authenticatedApiClient.post(
        `${config.apiBaseUrl}/product/get-all-products`,
        payload
    );

    const responseBody = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(responseBody.message).toBe('No Products Found');
    expect(responseBody.data).toEqual([]);
});