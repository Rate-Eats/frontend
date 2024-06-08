import SelectRating from '@pages/restaurants/components/SelectRating.tsx';
import SearchIcon from '@/assets/svgs/icons/search.svg?react';
import useCategories from '@/hooks/useCategories.tsx';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from '@shared/ui/button.tsx';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}`;

type QueryParams = { [key: string]: string | string[] };

const Filter = () => {
  const { categories, isCategoriesFetching, categoriesError } = useCategories();
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [minimumRating, setMinimumRating] = useState<number>(0);
  const [maximumRating, setMaximumRating] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlSearchValue = searchParams.get('search_query');
    if (urlSearchValue) {
      setSearchValue(urlSearchValue);
    }
  }, [searchParams]);

  const applyFilters = (params: QueryParams) => {
    const queryParams: QueryParams = {};
    for (const key in params) {
      if (params[key] !== '' && params[key] !== '0') {
        queryParams[key] = params[key];
      }
    }

    setSearchParams(queryParams);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      search_query: searchValue,
      category: activeCategories,
      minimum_rating: minimumRating.toString(),
      maximum_rating: maximumRating.toString(),
    };
    applyFilters(params);
  };

  const clearFilters = () => {
    setSearchValue('');
    setActiveCategories([]);
    setMinimumRating(0);
    setMaximumRating(0);
  };

  const updateActiveCategories = (category: string) => {
    const categoriesToUpdate = !activeCategories.includes(category)
      ? [...activeCategories, category]
      : activeCategories.filter((item) => item !== category);

    setActiveCategories(categoriesToUpdate);
  };

  const renderCategories = () => {
    if (isCategoriesFetching) {
      return Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="flex h-10 w-36 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#818181]/15 px-6 py-2 transition duration-200 hover:bg-[#818181]/5"
        />
      ));
    }

    if (categories) {
      return categories.map((category) => {
        const { name, value, icon } = category.attributes;
        return (
          <button
            onClick={() => updateActiveCategories(value)}
            className={`flex h-10 w-36 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#818181]/15 px-6 py-2 transition duration-200 hover:bg-[#818181]/50 ${
              activeCategories.includes(value) && 'bg-[#818181]/40'
            }`}
            key={value}
          >
            <img src={`${baseUploadsUrl}${icon.data.attributes.url}`} alt={`${icon.data.attributes.name}-icon`} />
            {name}
          </button>
        );
      });
    }

    if (categoriesError) return <div className="font-medium text-red-600">There was an error fetching categories</div>;

    return <div>No categories</div>;
  };

  return (
    <form className="mx-auto flex w-full flex-col gap-5 bg-white px-6 py-5" onSubmit={(e) => handleOnSubmit(e)}>
      <span className="text-[24px]">Filter</span>
      <div className="relative w-full rounded-md border bg-[#F5F6F7] px-4 py-2">
        <input
          placeholder="Search restaurant"
          className="w-full bg-transparent pl-5 text-sm outline-none"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="absolute bottom-0 left-2 top-0 flex items-center">
          <SearchIcon className="text-gray-500" />
        </div>
      </div>
      <span className="text-base">Filter by Type</span>
      <div className="flex items-center gap-5 overflow-scroll">{renderCategories()}</div>
      <span className="text-base">Filter by Rating</span>
      <div className="flex h-7 items-center gap-2">
        <SelectRating
          onChangeFunction={(value) => {
            if (value > maximumRating && maximumRating !== 0) return;
            setMinimumRating(value);
          }}
          value={minimumRating}
          maximumValue={maximumRating}
        />
        <div className="my-2 h-[2px] w-5 self-center bg-black" />
        <SelectRating
          onChangeFunction={(value) => {
            if (value < minimumRating && minimumRating !== 0) return;
            setMaximumRating(value);
          }}
          value={maximumRating}
          minimumValue={minimumRating}
        />
      </div>
      <div className="ml-auto flex gap-4">
        <Button
          type="submit"
          className="ml-auto w-28 border border-gray-200 bg-transparent text-black hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            clearFilters();
          }}
        >
          Clear all
        </Button>
        <Button type="submit" className=" w-36">
          Search
        </Button>
      </div>
    </form>
  );
};

export default Filter;
