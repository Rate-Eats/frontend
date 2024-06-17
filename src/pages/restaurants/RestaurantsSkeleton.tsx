import { Skeleton } from '@shared/ui/skeleton.tsx';
import React from 'react';

const RestaurantsSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 py-4">
      {new Array(4).fill(0).map((_, index) => (
        <div className="flex w-full gap-5 bg-white p-14" key={index}>
          <Skeleton
            className={`h-[350px] flex-1 items-center justify-center text-center ${index % 2 === 1 && 'order-last'} rounded-xl`}
          />
          <div className={`mt-8 flex flex-1  flex-col gap-3 ${index % 2 === 1 && 'items-end'}`}>
            <Skeleton className="h-7 w-24 "></Skeleton>
            <Skeleton className="h-5 w-32 "></Skeleton>
            <Skeleton className="h-6 w-40 "></Skeleton>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 "></Skeleton>
              <Skeleton className="h-6 w-20 "></Skeleton>
            </div>
            <Skeleton className="mt-4 h-6 w-full"></Skeleton>
            <Skeleton className="h-6 w-full "></Skeleton>
            <Skeleton className="h-6 w-full "></Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantsSkeleton;
