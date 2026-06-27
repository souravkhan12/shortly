export const envSchema = {
  type: "object",
  required: ["PORT", "NODE_ENV", "DATABASE_URL", "REDIS_URL", "BASE_URL"],
  properties: {
    PORT: {
      type: "number",
      default: 3000,
    },

    NODE_ENV: {
      type: "string",
      enum: ["development", "production", "test"],
      default: "development",
    },

    DATABASE_URL: {
      type: "string",
    },

    REDIS_URL: {
      type: "string",
    },

    BASE_URL: {
      type: "string",
    },
  },
} as const;
