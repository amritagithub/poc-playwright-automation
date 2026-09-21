import { environment } from './environment.js';

class ConfigurationManager {

    constructor() {
        this.validate();
    }

    validate() {
        const required = [
            'baseUrl',
            'username',
            'password',
            'apiBaseUrl',
        ];

        const missing = required.filter(
            key => !environment[key]
        );

        if (missing.length > 0) {
            throw new Error(
                `Missing required configuration: ${missing.join(', ')}`
            );
        }
    }

    get environment() {
        return environment.name;
    }

    get baseUrl() {
        return environment.baseUrl;
    }
    get apiBaseUrl() {
    return environment.apiBaseUrl;
}

    get username() {
        return environment.username;
    }

    get password() {
        return environment.password;
    }

    get browser() {
        return environment.browser;
    }

    get headless() {
        return environment.headless;
    }

    get defaultTimeout() {
        return environment.defaultTimeout;
    }

    get actionTimeout() {
        return environment.actionTimeout;
    }

    get navigationTimeout() {
        return environment.navigationTimeout;
    }

    get expectTimeout() {
        return environment.expectTimeout;
    }

    get workers() {
        return environment.workers;
    }

    get retries() {
        return environment.retries;
    }
}

export const config = new ConfigurationManager();