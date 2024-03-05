export interface RestaurantImages {
  main: boolean;
  path: string;
  hash: string;
  name: string;
  extension: string;
  menu: boolean;
}

export interface ReviewAttributesUserRelation {
  data: {
    id: 10;
    attributes: {
      username: 'Dashox';
      email: 'abc@gmail.com';
      provider: 'local';
      confirmed: true;
      blocked: false;
      createdAt: '2024-02-11T17:45:04.072Z';
      updatedAt: '2024-02-11T17:45:04.072Z';
      avatar: null;
    };
  };
}

export interface ReviewAttributes {
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
