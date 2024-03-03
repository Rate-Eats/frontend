import { z } from 'zod';

export const addReviewSchema = z.object({
  description: z.string().default(''),
  food: z.number().default(0),
  service: z.number().default(0),
  price: z.number().default(0),
  ambience: z.number().default(0),
  image: z.array(z.instanceof(File)).min(1, {
    message: 'Please select at least one image',
  }),
});
