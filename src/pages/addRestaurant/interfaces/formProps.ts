import { UseFormReturn } from 'react-hook-form';

export interface FormProps {
  form: UseFormReturn<{
    name: string;
    address: string;
    image: File[];
    description: string;
    category: string[];
  }>;
}
