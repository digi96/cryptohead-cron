export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PROVIDER_URL: string;
      APP_CONTRACT_ADDRESS: string;
      APP_CONTRACT_OWNER_KEY: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
