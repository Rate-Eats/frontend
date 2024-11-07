import { ImageDataInterface } from '@shared/interfaces/images.ts';
import { UserDataInterface } from '@shared/interfaces/user.ts';

export interface ReviewInterface {
  id: number;
  documentId: string;
  rating_food: number;
  rating_service: number;
  rating_ambience: number;
  rating_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  dislikeCount: number;
  likeCount: number;
  commentCount: number;
  images: ImageDataInterface[];
  users: UserDataInterface;
}
