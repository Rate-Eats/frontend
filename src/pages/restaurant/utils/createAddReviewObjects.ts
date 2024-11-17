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
  likeCount: 0,
  dislikeCount: 0,
  commentCount: 0,
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
    connect: [
      {
        documentId: userId,
        position: {
          end: true,
        },
      },
    ],
  },
});
