import { Restaurant } from '@shared/types/restaurant.ts';
import { Comment } from '@shared/types/comment.ts';
import { Image } from '@shared/types/image.ts';
import { User } from '@shared/types/user.ts';

export type Review = {
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
  images: Image[];
  users: User;
  comments?: Comment[];
  restaurant?: Restaurant;
};

type UserRelation = {
  documentId: string;
  position: {
    end: boolean;
  };
};

export type NewReview = {
  rating_food: number;
  rating_service: number;
  rating_ambience: number;
  rating_price: number;
  description: string;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  users: {
    connect: UserRelation[];
  };
};
