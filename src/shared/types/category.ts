import { Image } from '@shared/types/image.ts';

export type Category = {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
  icon: Image;
};
