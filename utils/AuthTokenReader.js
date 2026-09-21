import fs from 'node:fs';

export class AuthTokenReader {

    static read(storageStatePath) {

        const storageState = JSON.parse(
            fs.readFileSync(storageStatePath, 'utf-8')
        );

        const appOrigin = storageState.origins.find(
            origin => origin.origin === 'https://rahulshettyacademy.com'
        );

        if (!appOrigin) {
            throw new Error(
                'Application origin not found in saved authentication state'
            );
        }

        const tokenEntry = appOrigin.localStorage.find(
            item => item.name === 'token'
        );

        if (!tokenEntry?.value) {
            throw new Error(
                'Authentication token not found in saved Local Storage'
            );
        }

        return tokenEntry.value;
    }
}