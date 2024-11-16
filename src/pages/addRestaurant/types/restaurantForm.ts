import { UseFormReturn } from 'react-hook-form';

export type RestaurantForm = {
  form: UseFormReturn<{
    name: string;
    address: string;
    image: File[];
    description: string;
    category: string[];
  }>;
};
