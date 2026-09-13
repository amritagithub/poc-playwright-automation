import winston from 'winston';
import fs from 'fs';
import path from 'path';

const { combine, timestamp, printf } = winston.format;

const today = new Date().toISOString().split('T')[0];

const logDirectory = path.resolve('logs', today);

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logFormat = printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',

    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
    ),

    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(logDirectory, 'test.log')
        }),

        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error'
        })
    ]
});

export default logger;