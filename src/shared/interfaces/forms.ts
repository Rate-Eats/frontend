export interface RestaurantData {
  name: string;
  description: string;
  address: string;
  images: {
    main: boolean;
    path: string;
    hash: string;
    name: string;
    extension: string;
    __temp_key__: number;
  }[];
}

export interface ReviewData {
  rating_food: number;
  rating_service: number;
  rating_ambience: number;
  rating_price: number;
  description: string;
  images: PayloadImageInterface[];
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
