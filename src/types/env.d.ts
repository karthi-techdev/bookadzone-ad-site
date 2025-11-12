declare namespace NodeJS {
  interface ProcessEnv {
    // Server Environment
    NODE_ENV: 'development' | 'production' | 'test';
    
    // SMTP Configuration
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_SECURE: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_FROM: string;

    // Database Configuration
    MONGODB_URI: string;

    // API Configuration
    NEXT_PUBLIC_API_URL: string;
    
    // Site Configuration
    NEXT_PUBLIC_SITE_URL: string;
  }
}