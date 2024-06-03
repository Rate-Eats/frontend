import SearchIcon from '@/assets/svgs/icons/search.svg?react';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button } from '@shared/ui/button.tsx';
import Loader from '@shared/ui/loader.tsx';
import { categories } from '@shared/data/categories.ts';

type QueryParams = { [key: string]: string | string[] };

const Filter = () => {
  const [searchValue, setSearchValue] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlSearchValue = searchParams.get('search_query');
    if (urlSearchValue) {
      setSearchValue(urlSearchValue);
    }
  }, []);

  const applyFilters = (params: QueryParams) => {
    const queryParams: QueryParams = {};
    Object.keys(params).forEach((key) => {
      if (params[key] !== '') {
        queryParams[key] = params[key];
      }
    });

    setSearchParams(queryParams);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = {
      search_query: searchValue,
      category: activeCategories,
    };
    applyFilters(params);
  };

  const clearFilters = () => {
    setSearchValue('');
    setActiveCategories([]);
  };

  const updateActiveCategories = (category: string) => {
    const categoriesToUpdate = !activeCategories.includes(category)
      ? [...activeCategories, category]
      : activeCategories.filter((item) => item !== category);

    setActiveCategories(categoriesToUpdate);
  };

  return (
    <form className="mx-auto flex w-full flex-col gap-5 bg-white px-6 py-5" onSubmit={(e) => handleOnSubmit(e)}>
      <span className="text-[24px]">Filter</span>
      <div className="relative order-first w-full rounded-md border bg-[#F5F6F7] px-4 py-2 lg:order-none lg:w-auto">
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
      <div className="flex items-center gap-5">
        {categories.map((category) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              updateActiveCategories(category.value);
            }}
            className={`flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-gray-200 px-6 py-1 transition duration-200 hover:bg-gray-300 ${
              activeCategories.includes(category.value) && 'bg-gray-300'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="ml-auto flex gap-4">
        <Button
          type="submit"
          disabled={loading}
          className="ml-auto w-28 border border-gray-200 bg-transparent text-black hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            clearFilters();
          }}
        >
          {loading ? <Loader /> : 'Clear all'}
        </Button>
        <Button type="submit" disabled={loading} className=" w-36">
          {loading ? <Loader /> : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default Filter;
