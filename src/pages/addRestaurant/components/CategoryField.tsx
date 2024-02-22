import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@shared/ui/command.tsx';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover.tsx';
import { FormProps } from '@pages/addRestaurant/interfaces/formProps.ts';
import { categories } from '@shared/data/categories.ts';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Button } from '@shared/ui/button.tsx';
import React from 'react';

const CategoryField = ({ form }: FormProps) => {
  const categoriesToDisplay = form.watch('category');

  const handleShowCategories = () => {
    return categoriesToDisplay.length > 0 ? (
      categoriesToDisplay.map((categoryValue) => {
        const category = categories.find((cat) => cat.value === categoryValue);
        return (
          category && (
            <div
              key={category.label}
              className="rounded-sm bg-[#F0F0F0] p-1.5 text-[#6E7072] transition hover:bg-gray-200"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryChange(category);
              }}
            >
              {category.label}
            </div>
          )
        );
      })
    ) : (
      <span className="text-gray-400">Select category</span>
    );
  };

  const handleCategoryChange = (category: { value: string }) => {
    const currentCategoryValues = categoriesToDisplay;
    if (currentCategoryValues.includes(category.value)) {
      form.setValue(
        'category',
        currentCategoryValues.filter((item) => item !== category.value),
      );
      form.clearErrors('category');
    } else {
      form.setValue('category', [...currentCategoryValues, category.value]);
      form.clearErrors('category');
    }
  };

  return (
    <FormField
      control={form.control}
      name="category"
      render={() => (
        <FormItem className="flex flex-col space-y-1">
          <FormLabel className="text text-base font-medium">Category</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="flex h-12 w-full justify-between border-gray-300 shadow-sm hover:bg-white"
                >
                  <div className="flex gap-2">{handleShowCategories()}</div>
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              style={{
                width: 'var(--radix-popover-trigger-width)',
              }}
            >
              <Command>
                <CommandInput placeholder="Search category..." className="h-9" />
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      value={category.label}
                      key={category.value}
                      onSelect={() => handleCategoryChange(category)}
                    >
                      {category.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategoryField;
