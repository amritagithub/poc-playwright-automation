import fs from 'node:fs';
import path from 'node:path';

export class JsonReader {

    constructor(baseDirectory) {
        this.baseDirectory = baseDirectory;
    }

    read(relativeFilePath) {

        const filePath = path.resolve(
            this.baseDirectory,
            relativeFilePath
        );

        let fileContent;

        try {
            fileContent = fs.readFileSync(
                filePath,
                'utf-8'
            );
        } catch (error) {
            throw new Error(
                `Unable to read JSON file "${filePath}": ${error.message}`,
                { cause: error }
            );
        }

        try {
            return JSON.parse(fileContent);
        } catch (error) {
            throw new Error(
                `Invalid JSON in file "${filePath}": ${error.message}`,
                { cause: error }
            );
        }
    }
    getRequiredValue(data, keys) {

    let value = data;

    for (const key of keys) {

        if (
            value === null ||
            typeof value !== 'object' ||
            !Object.hasOwn(value, key)
        ) {
            throw new Error(
                `Missing required test data: ${keys.join('.')}`
            );
        }

        value = value[key];
    }

    if (
        value === null ||
        value === undefined ||
        (typeof value === 'string' && value.trim() === '')
    ) {
        throw new Error(
            `Invalid or empty test data: ${keys.join('.')}`
        );
    }

    return value;
}
}