import { UseFormReturn } from 'react-hook-form';

export type AddReviewForm = {
  form: UseFormReturn<{
    food: number;
    service: number;
    price: number;
    ambience: number;
    image: File[];
    description: string;
  }>;
};
