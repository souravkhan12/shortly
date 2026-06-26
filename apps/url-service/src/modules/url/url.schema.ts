export const createUrlSchema = {
  body: {
    type: "object",
    required: ["url"],
    additionalProperties: false,

    properties: {
      url: {
        type: "string",
        format: "uri",
      },
    },
  },

  response: {
    201: {
      type: "object",

      properties: {
        id: { type: "number" },

        shortCode: { type: "string" },

        shortUrl: { type: "string" },

        originalUrl: { type: "string" },

        createdAt: {
          type: "string",
        },
      },
    },
  },
} as const;
