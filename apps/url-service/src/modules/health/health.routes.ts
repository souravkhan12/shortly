import type { FastifyInstance } from "fastify";

export async function registerHealthRoutes(app: FastifyInstance) {
  app.get("/health", async (req: any, res: any) => {
    res.status(200).json({ status: "ok" });
  });
}
