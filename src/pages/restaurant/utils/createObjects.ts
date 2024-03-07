import { ImageInterface, PayloadImageInterface } from '@shared/interfaces/forms.ts';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { z } from 'zod';

export const createImageObject = (image: ImageInterface) => ({
  main: false,
  path: image.hash + image.ext,
  hash: image.hash,
  name: image.name,
  extension: image.ext,
});

export const createReviewObject = (
  reviewData: z.infer<typeof addReviewSchema>,
  imagesArray: any,
  restaurantId: string,
  userId: number,
) => ({
  rating_food: reviewData.food,
  rating_service: reviewData.service,
  rating_ambience: reviewData.ambience,
  rating_price: reviewData.price,
  description: reviewData.description,
  images: imagesArray,
  restaurant: {
    disconnect: [],
    connect: [
      {
        id: Number(restaurantId),
        position: {
          end: true,
        },
      },
    ],
  },
  users: {
    disconnect: [],
    connect: [
      {
        id: userId,
        position: {
          end: true,
        },
      },
    ],
  },
});
