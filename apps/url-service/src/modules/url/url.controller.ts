import type { FastifyReply, FastifyRequest } from "fastify";

import { UrlMapper } from "./url.mapper.js";
import { UrlService } from "./url.service.js";
import type { CreateUrlRequest } from "./url.types.js";

export class UrlController {
  constructor(private readonly service: UrlService) {}

  async create(
    request: FastifyRequest<{
      Body: CreateUrlRequest;
    }>,
    reply: FastifyReply,
  ) {
    const dto = UrlMapper.toCreateDto(request.body);

    const result = await this.service.create(dto);

    return reply.code(201).send(result);
  }
}
