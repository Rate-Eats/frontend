import { ImageDataInterface } from '@shared/interfaces/images.ts';

export interface ReviewAttributesUserRelation {
  documentId: string;
  id: 10;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  avatar: null;
}

export interface CommentData {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
  users: ReviewAttributesUserRelation;
}

export interface Reviews {
  images: ImageDataInterface[];
  rating_food: number;
  rating_service: number;
  rating_ambience: number;
  rating_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: null;
  description: string;
  id: number;
  documentId: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  users: ReviewAttributesUserRelation;
  comments: CommentData[];
}

export interface Categories {
  id: string;
  createdAt: string;
  name: string;
  publishedAt: string;
  updatedAt: string;
  value: string;
}

export interface RestaurantData {
  id: number;
  documentId: string;
  name: string;
  description: string;
  address: string;
  median_rating: number;
  images: ImageDataInterface[];
  reviews: Reviews[];
  categories: Categories[];
}
