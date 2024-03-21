export interface ReviewImageData {
  id: number;
  path: string;
  name: string;
  hash: string;
  extension: string;
  main: boolean;
  menu: boolean;
}

interface ReviewUserData {
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

interface ReviewRestaurantData {
  data: {
    id: number;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      description: string;
      address: string;
    };
  };
}

export interface ReviewCommentsData {
  data: {
    id: number;
    attributes: {
      text: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  }[];
}

export interface ReviewData {
  id: number;
  attributes: {
    rating_food: number;
    rating_ambience: number;
    rating_price: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    rating_service: number;
    comments: ReviewCommentsData;
    images: ReviewImageData[];
    users: ReviewUserData;
    restaurant: ReviewRestaurantData;
  };
}
