import { addReviewSchema } from '@/schemas/addReviewSchema.ts';
import { z } from 'zod';

export const createAddReviewObjects = (
  reviewData: z.infer<typeof addReviewSchema>,
  restaurantId: string,
  userId: string,
) => ({
  rating_food: reviewData.food,
  rating_service: reviewData.service,
  rating_ambience: reviewData.ambience,
  rating_price: reviewData.price,
  description: reviewData.description,
  images: null,
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
