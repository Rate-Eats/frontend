import { Skeleton } from '@shared/ui/skeleton.tsx';

const RestaurantSkeleton = () => {
  return (
    <div className="mx-auto mt-5 flex max-w-screen-lg justify-center gap-40 w-full  ">
      <Skeleton className="h-[420px] w-full" />
    </div>
  );
};

export default RestaurantSkeleton;
