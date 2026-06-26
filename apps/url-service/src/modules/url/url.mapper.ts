import type { CreateUrlDto, CreateUrlResponseDto } from "./url.dto.js";
import type { CreateUrlRequest } from "./url.types.js";

export class UrlMapper {
  static toCreateDto(request: CreateUrlRequest): CreateUrlDto {
    return {
      originalUrl: request.url,
    };
  }

  static toCreateResponse(data: CreateUrlResponseDto) {
    return {
      id: data.id,
      shortCode: data.shortCode,
      shortUrl: data.shortUrl,
      originalUrl: data.originalUrl,
      createdAt: data.createdAt,
    };
  }
}
