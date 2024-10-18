export interface RestaurantImages {
  main: boolean;
  path: string;
  hash: string;
  name: string;
  extension: string;
  menu: boolean;
  id?: number;
}

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

export interface Reviews {
  images: RestaurantImages[];
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
  users: ReviewAttributesUserRelation;
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
  images: RestaurantImages[];
  reviews: Reviews[];
  categories: Categories[];
}
