import { ImageInterface, RestaurantData } from '@shared/interfaces/forms.ts';
import { addRestaurantSchema } from '@/schemas/addRestaurantSchema.ts';
import { z } from 'zod';

export const createRestaurantObject = (
  restaurantData: z.infer<typeof addRestaurantSchema>,
  data: ImageInterface[],
): RestaurantData => {
  const imagesArray = data.map((image: ImageInterface, index: number) => ({
    main: false,
    path: image.hash + image.ext,
    hash: image.hash,
    name: image.name,
    extension: image.ext,
    __temp_key__: index,
  }));
  return {
    ...restaurantData,
    images: imagesArray,
    ratings: {
      disconnect: [],
      connect: [],
    },
  };
};
