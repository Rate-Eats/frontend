import { Skeleton } from '@shared/ui/skeleton.tsx';

const RestaurantSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-5 py-6">
      <Skeleton className="h-[350px] w-full" />
      <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[32px] w-[150px]" />
          <Skeleton className="flex h-[32px] w-[170px] gap-2 font-medium" />
        </div>
        <Skeleton className="mt-4 h-[24px] max-h-20 w-full" />
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex flex-col gap-5">
          <div className="flex">
            <div className="flex-1">
              <Skeleton className="h-[25px] w-[250px]" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-[25px] w-[250px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[32px] w-[205px]" />
        </div>
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex h-[140px] gap-4">
          <Skeleton className="size-[138px]" />
          <Skeleton className="size-[138px]" />
          <Skeleton className="size-[138px]" />
        </div>
      </div>
      <div className="flex h-[329px] w-full flex-col rounded-xl bg-white px-6 py-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[32px] w-[235px]" />
        </div>
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex gap-24">
          <div className="flex flex-col items-center justify-center gap-5">
            <Skeleton className="h-[24px] w-[180px]" />
            <Skeleton className="h-[60px] w-[90px]" />
            <Skeleton className="h-[20px] w-[90px]" />
            <Skeleton className="h-[20px] w-[222px]" />
          </div>
          <div className="flex w-full flex-col gap-8">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {new Array(2).fill(0).map(() => (
          <div className="flex flex-col gap-4 rounded-lg bg-white p-5">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-[16px] w-[85px]" />
            </div>
            <div className="h-[24px] w-full">
              <Skeleton className="h-[14px] w-full" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="size-[70px] rounded-md" />
              <Skeleton className="size-[70px] rounded-md" />
              <Skeleton className="size-[70px] rounded-md" />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-3">
                <Skeleton className="h-5 w-8 rounded-md" />
                <Skeleton className="h-5 w-8 rounded-md" />
                <Skeleton className="h-5 w-8 rounded-md" />
              </div>
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantSkeleton;
