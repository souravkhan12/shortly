export interface AppConfig {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  DATABASE_URL: string;
  REDIS_URL: string;
  BASE_URL: string;
}
