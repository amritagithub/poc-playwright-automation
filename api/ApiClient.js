export class ApiClient {
    constructor(request, logger) {
        this.request = request;
        this.logger = logger;
    }

    async get(url, options = {}) {
        this.logger?.info(`GET ${url}`);

        return await this.request.get(url, options);
    }

    async post(url, data, options = {}) {
        this.logger?.info(`POST ${url}`);

        return await this.request.post(url, {
            ...options,
            data
        });
    }
}