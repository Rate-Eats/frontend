import { z } from 'zod';

export const addRestaurantMenuSchema = z.object({
  image: z.array(z.instanceof(File)).min(1, {
    message: 'Please select at least one image',
  }),
});
