export interface RestaurantImages {
  main: boolean;
  path: string;
  hash: string;
  name: string;
  extension: string;
  menu: boolean;
  id: number;
}

export interface ReviewAttributesUserRelation {
  data: {
    id: number;
    attributes: {
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      createdAt: string;
      updatedAt: string;
      avatar: string;
    };
  };
}

export interface ReviewAttributes {
  images: RestaurantImages[];
  rating_food: number;
  rating_service: number;
  rating_ambience: number;
  rating_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: null;
  description: string;
  id: string;
  users: ReviewAttributesUserRelation;
}

export interface ReviewAttributesData {
  id: string;
  attributes: ReviewAttributes;
}

export interface Reviews {
  data: ReviewAttributesData[];
}

export interface RestaurantData {
  id: number;
  attributes: {
    name: string;
    description: string;
    address: string;
    images: RestaurantImages[];
    reviews: Reviews;
  };
}
