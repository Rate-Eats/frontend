import { ImageDataInterface } from '@shared/interfaces/images.ts';

export interface RestaurantData {
  name: string;
  description: string;
  address: string;
  images: ImageDataInterface | null;
}

export interface ReviewData {
  rating_food: number;
  rating_service: number;
  rating_ambience: number;
  rating_price: number;
  description: string;
  images?: null;
}

export interface CommentData {
  text: string;
}

export interface ImageInterface {
  ext: string;
  hash: string;
  name: string;
}

export interface PayloadImageInterface {
  main: boolean;
  path: string;
  hash: string;
  name: string;
  extension: string;
}
