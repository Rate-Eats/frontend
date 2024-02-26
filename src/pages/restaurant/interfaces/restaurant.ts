export interface RestaurantImages {
  main: boolean;
  path: string;
  hash: string;
  name: string;
  extension: string;
}

export interface RestaurantData {
  id: number;
  attributes: {
    name: string;
    description: string;
    address: string;
    images: RestaurantImages[];
    ratings: {
      disconnect: [];
      connect: [];
    };
  };
}
