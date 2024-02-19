import DescriptionField from '@pages/addRestaurant/components/DescriptionField.tsx';
import CategoryField from '@pages/addRestaurant/components/CategoryField.tsx';
import AddressField from '@pages/addRestaurant/components/AddressField.tsx';
import ImageField from '@pages/addRestaurant/components/ImageField.tsx';
import { addRestaurantSchema } from '@/schemas/addRestaurantSchema.ts';
import NameField from '@pages/addRestaurant/components/NameField.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@shared/ui/button.tsx';
import { Form } from '@shared/ui/form.tsx';
import { useAuth } from '@auth/useAuth.ts';
import { useForm } from 'react-hook-form';
import React from 'react';
import { z } from 'zod';
import axios from 'axios';

const AddRestaurant = () => {
  const { jwtToken } = useAuth();
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

  const uploadImages = useMutation({
    mutationFn: (files: FormData) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/upload`, files, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    },
    onSuccess: (data) => console.log(data.data),
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.error.message);
      } else {
        console.log('An error occurred:' + error.message);
      }
    },
  });

  function onSubmit(data: z.infer<typeof addRestaurantSchema>) {
    const formData = new FormData();
    Array.from(data.image).forEach((file) => {
      formData.append('files', file);
    });

    uploadImages.mutate(formData);
  }

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
