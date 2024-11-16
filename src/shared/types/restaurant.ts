import { Category } from '@shared/types/category.ts';
import { Review } from '@shared/types/review.ts';
import { Image } from '@shared/types/image.ts';

export type Restaurant = {
  id: number;
  documentId: string;
  name: string;
  description: string;
  median_rating: number;
  address: string;
  images?: Image[];
  reviews?: Review[];
  categories?: Category[];
};

export type NewRestaurant = {
  name: string;
  description: string;
  address: string;
  images?: Image[] | null;
};
