import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form.tsx';
import { FormProps } from '@pages/addRestaurant/interfaces/formProps.ts';
import { Input } from '@shared/ui/input.tsx';
import React from 'react';

const NameField = ({ form }: FormProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel className=" mb-3 text-base font-medium">Name</FormLabel>
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

export default NameField;
