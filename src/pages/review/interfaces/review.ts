import { ImageDataInterface } from '@shared/interfaces/images.ts';

interface ReviewUserData {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}

interface ReviewRestaurantData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  address: string;
}

interface CommentsData {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}

export interface ReviewCommentsData {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  users: CommentsData;
}

export interface ReviewData {
  id: number;
  rating_food: number;
  rating_ambience: number;
  rating_price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  rating_service: number;
  comments: ReviewCommentsData[];
  images: ImageDataInterface[];
  users: ReviewUserData;
  restaurant: ReviewRestaurantData;
}
