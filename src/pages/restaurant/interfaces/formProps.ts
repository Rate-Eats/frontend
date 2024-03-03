import { UseFormReturn } from 'react-hook-form';

export interface FormProps {
  form: UseFormReturn<{
    food: number;
    service: number;
    price: number;
    ambience: number;
    image: File[];
    description: string;
  }>;
}
