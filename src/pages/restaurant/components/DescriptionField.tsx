import { FormControl, FormField, FormItem, FormMessage } from '@shared/ui/form.tsx';
import { FormProps } from '@pages/restaurant/interfaces/formProps.ts';
import { Textarea } from '@shared/ui/textarea.tsx';
import React from 'react';

const DescriptionField = ({ form }: FormProps) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormControl>
            <Textarea
              placeholder="Share your experiences from this place."
              {...field}
              className="h-20 max-h-40 border border-gray-300 bg-white focus-visible:ring-0"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
