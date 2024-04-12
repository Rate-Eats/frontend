import { Skeleton } from '@shared/ui/skeleton.tsx';

const ReviewSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-5 py-6">
      <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
        <Skeleton className="h-[32px] w-[150px]" />
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex flex-col gap-5">
          <Skeleton className="h-[24px] w-full" />
        </div>
      </div>
      <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[32px] w-[100px]" />
        </div>
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex h-[300px] gap-4">
          <Skeleton className="h-[300px] flex-1" />
          <Skeleton className="h-[300px] flex-1" />
          <Skeleton className="h-[300px] flex-1" />
        </div>
      </div>
      <div className="flex h-[329px] w-full flex-col rounded-xl bg-white px-6 py-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-[32px] w-[85px]" />
        </div>
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex gap-24">
          <div className="flex flex-col items-center justify-center gap-5">
            <Skeleton className="h-[24px] w-[180px]" />
            <Skeleton className="h-[60px] w-[90px]" />
            <Skeleton className="h-[20px] w-[90px]" />
          </div>
          <div className="flex w-full flex-col gap-8">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
        <Skeleton className="h-[32px] w-[150px]" />
        <div className="my-5 h-px w-full divide-x  bg-gray-200"></div>
        <div className="flex items-center gap-5">
          <Skeleton className="size-10 rounded-full " />
          <Skeleton className="h-[24px] w-20" />
        </div>
        <div className="mt-3 flex flex-col gap-5">
          <Skeleton className="h-[24px] w-60" />
          <Skeleton className="h-[24px] w-16" />
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
