interface FormatImage {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}
interface ImageFormats {
  small: FormatImage;
  thumbnail: FormatImage;
  medium: FormatImage;
  large: FormatImage;
}

export interface ImageDataInterface {
  format: ImageFormats;
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  documentId: string;
  ext: string;
  provider: string;
  provider_metadata: string | null;
  previewUrl: string;
  id: number;
  name: string;
  width: number;
  height: number;
  hash: string;
  mime: string;
  size: number;
  url: string;
  updatedAt: string;
  publishedAt: string;
  type: string;
  action?: 'delete' | 'update' | null;
}
