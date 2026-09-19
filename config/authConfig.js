import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(
    new URL('../', import.meta.url)
);

export const authConfig = {
    storageStatePath: path.join(
        projectRoot,
        'playwright',
        '.auth',
        'user.json'
    )
};