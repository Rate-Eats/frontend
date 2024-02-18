import { z } from 'zod';

export const addRestaurantSchema = z.object({
  name: z.string().min(1, {
    message: 'Name cannot be empty.',
  }),
  description: z.string().default(''),
  category: z.array(z.string()).min(1, {
    message: 'Please select at least one category.',
  }),
  address: z.string().min(1, {
    message: 'Address cannot be empty.',
  }),
  image: z
    .array(
      z.object({
        name: z.string(),
        blobUrl: z.string(),
      }),
    )
    .min(1, {
      message: 'Please select at least one image',
    }),
});
