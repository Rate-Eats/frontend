import DescriptionField from '@pages/addRestaurant/components/DescriptionField.tsx';
import CategoryField from '@pages/addRestaurant/components/CategoryField.tsx';
import AddressField from '@pages/addRestaurant/components/AddressField.tsx';
import ImageField from '@pages/addRestaurant/components/ImageField.tsx';
import { addRestaurantSchema } from '@/schemas/addRestaurantSchema.ts';
import NameField from '@pages/addRestaurant/components/NameField.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { Form } from '@shared/ui/form.tsx';
import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import { z } from 'zod';
import { ImageInterface, RestaurantData } from '@shared/interfaces/forms.ts';

interface ErrorsProps {
  path: string[];
  message: 'This attribute must be unique';
  name: 'ValidationError';
}

const AddRestaurant = () => {
  const navigate = useNavigate();
  const { uploadImages, addRestaurant } = useDatabase();

  const form = useForm<z.infer<typeof addRestaurantSchema>>({
    resolver: zodResolver(addRestaurantSchema),
    defaultValues: {
      name: '',
      description: '',
      category: [],
      address: '',
      image: [],
    },
  });

  const setErrors = (errors: ErrorsProps[]) => {
    errors.map((error: ErrorsProps) => {
      if (error.path[0] === 'name') {
        form.setError('name', { type: 'custom', message: error.message });
      }
    });
  };

  const onSubmit = async (restaurantData: z.infer<typeof addRestaurantSchema>) => {
    const formData = new FormData();
    Array.from(restaurantData.image).forEach((file) => {
      formData.append('files', file);
    });

    await uploadImages.mutateAsync(formData, {
      onSuccess: ({ data }) => {
        const imagesArray = data.map((image: ImageInterface, index: number) => ({
          main: false,
          path: image.hash + image.ext,
          hash: image.hash,
          name: image.name,
          extension: image.ext,
          __temp_key__: index,
        }));
        const addRestaurantObject: RestaurantData = {
          name: restaurantData.name,
          description: restaurantData.description,
          address: restaurantData.address,
          images: imagesArray,
          ratings: {
            disconnect: [],
            connect: [],
          },
        };
        addRestaurant.mutate(addRestaurantObject, {
          onSuccess: (data) => navigate(`/restaurant/${data.data.data.id}`),
          onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
              const errors = error?.response?.data?.error?.details?.errors;
              if (errors) setErrors(errors);
            } else {
              console.log('An error occurred:' + error.message);
            }
          },
        });
      },
    });
  };

  return (
    <div className="flex w-full justify-center px-5">
      <div className="mt-12 flex w-full max-w-screen-lg flex-col gap-2.5 ">
        <div className="mb-2 border-b border-b-[#C5C5C5] py-1.5 text-[22px] text-xl font-medium">Add restaurant</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-6">
            <NameField form={form} />
            <DescriptionField form={form} />
            <CategoryField form={form} />
            <AddressField form={form} />
            <ImageField form={form} />
            <Button type="submit">add restaurant</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddRestaurant;
