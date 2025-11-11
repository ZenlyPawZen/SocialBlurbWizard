export interface OptimizeRequest {
  blurb: string;
  hashtags: string;
  cta: string;
  platform: string;
  characterLimit: number;
}

export interface OptimizeResponse {
  optimizedText: string;
}
