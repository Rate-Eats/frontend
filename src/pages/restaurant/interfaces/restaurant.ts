export interface RestaurantImages {
  main: boolean;
  path: string;
  hash: string;
  name: string;
  extension: string;
  menu: boolean;
}

export interface Ratings {
  data: {
    attributes: {
      rating_food: number;
      rating_service: number;
      rating_ambience: number;
      rating_price: number;
      createdAt: string;
      updatedAt: string;
      publishedAt: null;
    };
  }[];
}

export interface RestaurantData {
  id: number;
  attributes: {
    name: string;
    description: string;
    address: string;
    images: RestaurantImages[];
    ratings: Ratings;
  };
}
