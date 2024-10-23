import { Skeleton } from '@/shared/ui/skeleton';

const SkeletonLastAddedRestaurants = () => {
  return (
    <div className="flex w-full justify-center overflow-hidden bg-white py-14">
      <div className="mx-8 flex w-full max-w-7xl gap-8">
        <div className="flex w-full flex-col gap-4">
          <Skeleton className="h-8 w-1/2"></Skeleton>
          <Skeleton className="h-8 w-full"></Skeleton>
          <Skeleton className="h-8 w-3/4"></Skeleton>
          <div className="mt-auto grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <Skeleton className="w-full h-full max-h-[330px] object-cover" />
      </div>
    </div>
  );
};

export default SkeletonLastAddedRestaurants;
