import { ImageInterface, PayloadImageInterface } from '@shared/interfaces/forms.ts';
import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { z } from 'zod';

export const createImageObject = (image: ImageInterface) => ({
  main: false,
  path: image.hash + image.ext,
  hash: image.hash,
  name: image.name,
  extension: image.ext,
  menu: false,
});

export const createReviewObject = (
  reviewData: z.infer<typeof addReviewSchema>,
  imagesArray: PayloadImageInterface[],
  restaurantId: string,
  userId: string,
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
        documentId: restaurantId,
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
        documentId: userId,
        position: {
          end: true,
        },
      },
    ],
  },
  comments: {
    connect: [],
    disconnect: [],
  },
});
