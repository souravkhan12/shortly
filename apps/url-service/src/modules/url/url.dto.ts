/**
 * Request DTO received by the service layer.
 */
export interface CreateUrlDto {
  originalUrl: string;
}

/**
 * Response DTO returned by the service layer.
 */
export interface CreateUrlResponseDto {
  id: number;

  shortCode: string;

  shortUrl: string;

  originalUrl: string;

  createdAt: Date;
}
