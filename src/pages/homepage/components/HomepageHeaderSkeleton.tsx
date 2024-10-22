import { Skeleton } from '@shared/ui/skeleton.tsx';

export const HomepageHeaderSkeleton = () => {
  return (
    <div className="flex w-full justify-center overflow-hidden bg-white py-20">
      <div className="mx-8 flex w-full max-w-7xl gap-8">
        <div className="flex flex-1 flex-col justify-center">
          <Skeleton className="mb-3 h-10 w-[90%]" />
          <Skeleton className="mb-3 h-10 w-[70%]" />
          <Skeleton className="h-5 w-[100%%]" />
          <Skeleton className="mt-4 h-5 w-[100%%]" />
          <Skeleton className="mt-4 h-5 w-[35%]" />
        </div>
        <div className="flex flex-[2] gap-8 max-xl:mr-[-100px]">
          <div className="max-h-[440px] min-h-[440px] min-w-[170px] max-w-[170px] rounded-2xl max-xl:min-w-[150px] max-xl:max-w-[150px]">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="max-h-[440px] min-h-[440px] min-w-[370px] max-w-[370px] rounded-2xl max-xl:min-w-[350px] max-xl:max-w-[350px]">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="max-h-[440px] min-h-[440px] min-w-[220px] max-w-[220px] rounded-2xl max-xl:min-w-[200px] max-xl:max-w-[200px]">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
