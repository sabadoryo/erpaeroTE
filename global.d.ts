declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        PORT: string;
        PASSWORD_SALT: string;
        JWT_SECRET: string;
    }
}