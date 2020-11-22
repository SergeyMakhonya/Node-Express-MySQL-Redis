import path from 'path';

export interface Config {
    isDevelopment: boolean;

    dbHost: string;
    dbDatabase: string;
    dbUser: string;
    dbPassword: string;

    redisHost: string;
    redisPort: number;

    hashSalt: string;

    publicUrls: string[];

    jwtSecret: string;
    jwtExpiresIn: number;
}

export let config: Config;

export function loadConfig(envFileName: string = '.env') {
    const envPath = path.resolve(__dirname, '../' + envFileName);

    const fs = require('fs');
    if (!fs.existsSync(envPath)) {
        console.error('ERROR: dotenv file not found!');
        process.exit(1);
    }
    
    const dotEnv = require('dotenv');
    dotEnv.config({
        path: envPath,
    });

    config = {
        isDevelopment: process.env.NODE_ENV === 'development',

        dbHost: process.env.DB_HOST,
        dbDatabase: process.env.DB_DATABASE,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,

        redisHost: process.env.DB_HOST,
        redisPort: +process.env.DB_PORT,
    
        hashSalt: process.env.HASH_SALT,
    
        publicUrls: [
            '/health-check',
            '/shared',
            '/auth/signup',
            '/auth/signin',
        ],
    
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: +process.env.JWT_EXPIRES_SECONDS,
    };
}

loadConfig();
