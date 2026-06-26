export interface CreateUrlDto {
  originalUrl: string;
}

export interface CreateUrlResponseDto {
  id: number;
  shortCode: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: Date;
}
