import { Skeleton } from '@/shared/ui/skeleton';

const SkeletonLastAddedRestaurants = () => {


  return (
    <div className="flex h-[500px] w-10/12 gap-10 self-center justify-self-auto border p-10">
      <div className="flex w-full flex-col gap-4">
        <Skeleton className="h-8 w-1/2"></Skeleton>
        <Skeleton className="h-8 w-full"></Skeleton>
        <Skeleton className="h-8 w-1/2"></Skeleton>
        <div className="mt-auto grid grid-cols-2 gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default SkeletonLastAddedRestaurants;
