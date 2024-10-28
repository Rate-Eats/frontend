import { Skeleton } from '@shared/ui/skeleton.tsx';
import React from 'react';

const JoinCommunitySectionSkeleton = () => {
  return (
    <div className="flex w-full justify-center overflow-hidden py-14">
      <div className="mx-8 flex w-full max-w-7xl items-center gap-8">
        <div className="flex flex-[1.3] flex-col flex-wrap items-center gap-2">
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-4/6" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-4">
          <Skeleton className="h-12 w-32 rounded-md bg-blue-500 px-6 py-2"></Skeleton>
          <Skeleton className="h-12 w-32 rounded-md px-6 py-2" />
        </div>
      </div>
    </div>
  );
};

export default JoinCommunitySectionSkeleton;
