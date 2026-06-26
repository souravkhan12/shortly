const createUrlBodySchema = {
  type: "object",
  required: ["url"],
  additionalProperties: false,
  properties: {
    url: {
      type: "string",
      format: "uri",
    },
  },
} as const;

const createUrlResponseSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    shortCode: { type: "string" },
    shortUrl: { type: "string" },
    originalUrl: { type: "string" },
    createdAt: {
      type: "string",
      format: "date-time",
    },
  },
} as const;

export const createUrlSchema = {
  description: "Create a shortened URL",
  tags: ["URL"],
  body: createUrlBodySchema,
  response: {
    201: createUrlResponseSchema,
  },
} as const;
