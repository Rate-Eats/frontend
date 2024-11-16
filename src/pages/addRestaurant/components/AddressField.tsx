import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form.tsx';
import { RestaurantForm } from '@pages/addRestaurant/types/restaurantForm.ts';
import { Input } from '@shared/ui/input.tsx';
import React from 'react';

const AddressField = ({ form }: RestaurantForm) => {
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className=" mb-3 text-base font-medium">Address</FormLabel>
          <FormControl>
            <Input
              placeholder="Write here..."
              {...field}
              className="h-12 border border-gray-300  bg-white focus-visible:ring-0"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressField;
