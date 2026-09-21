export class ProductPayloadFactory {
    static create(overrides = {}) {
        return {
            productName: '',
            minPrice: null,
            maxPrice: null,
            productCategory: [],
            productSubCategory: [],
            productFor: [],
            ...overrides
        };
    }
}