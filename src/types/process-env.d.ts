export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            PORT: string;
            PASSWORD_SALT: string;
            JWT_SECRET: string;
            JWT_REFRESH_SECRET: string;
        }
    }    
}
