import { Skeleton } from '@shared/ui/skeleton.tsx';

const CommentsSkeleton = ({ commentsLength }: { commentsLength: number }) => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col">
      {new Array(commentsLength).fill(null).map(() => (
        <>
          <div className="my-5 h-px w-full divide-x bg-gray-200"></div>
          <div className="flex w-full flex-col rounded-xl bg-white ">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5">
                <Skeleton className="size-10 rounded-full " />
                <Skeleton className="h-[24px] w-20" />
              </div>
              <Skeleton className="h-[20px] w-60" />
            </div>
            <div className="mt-1 flex flex-col">
              <Skeleton className="mt-2 h-[20px] w-24" />
            </div>
          </div>
        </>
      ))}
      <div className="my-5 h-px w-full divide-x bg-gray-200"></div>
      <div className="flex justify-center">
        <Skeleton className="mt-[16px] h-[36px] w-36" />
      </div>
    </div>
  );
};

export default CommentsSkeleton;
