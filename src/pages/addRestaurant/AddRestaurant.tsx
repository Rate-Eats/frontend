import { createUploadImagesFormData } from '@shared/utils/createUploadImagesFormData.ts';
import DescriptionField from '@pages/addRestaurant/components/DescriptionField.tsx';
import CategoryField from '@pages/addRestaurant/components/CategoryField.tsx';
import AddressField from '@pages/addRestaurant/components/AddressField.tsx';
import ImageField from '@pages/addRestaurant/components/ImageField.tsx';
import { addRestaurantSchema } from '@/schemas/addRestaurantSchema.ts';
import NameField from '@pages/addRestaurant/components/NameField.tsx';
import { NewRestaurant } from '@shared/types/restaurant.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import useDatabase from '@/hooks/useDatabase.tsx';
import { Button } from '@shared/ui/button.tsx';
import { Error } from '@shared/types/error.ts';
import { useNavigate } from 'react-router-dom';
import { Form } from '@shared/ui/form.tsx';
import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import { z } from 'zod';

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

  const setErrors = (errors: Error[]) => {
    errors.map((error: Error) => {
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

    const addRestaurantObject: NewRestaurant = {
      name: restaurantData.name,
      description: restaurantData.description,
      address: restaurantData.address,
      images: null,
    };

    addRestaurant.mutate(addRestaurantObject, {
      onSuccess: (data) => uploadImagesToRestaurant(restaurantData.image, data.data.data.id, data.data.data.documentId),
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errors = error?.response?.data?.error?.details?.errors;
          if (errors) setErrors(errors);
        } else {
          console.log('An error.ts occurred:' + error.message);
        }
      },
    });
  };

  const uploadImagesToRestaurant = async (images: File[], id: number, documentId: string) => {
    const formData = createUploadImagesFormData(images, id, 'api::restaurant.restaurant');

    await uploadImages.mutateAsync(formData, {
      onSuccess: () => navigate(`/restaurant/${documentId}`),
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errors = error?.response?.data?.error?.details?.errors;
          if (errors) setErrors(errors);
        } else {
          console.log('An error.ts occurred:' + error.message);
        }
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
