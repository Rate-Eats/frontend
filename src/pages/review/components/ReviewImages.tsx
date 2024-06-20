import { Dialog, DialogContent, DialogTrigger } from '@shared/ui/dialog.tsx';
import { ReviewImageData } from '@pages/review/interfaces/review.ts';
import ExpandIcon from '@assets/svgs/icons/expand.svg?react';
import { Button } from '@shared/ui/button.tsx';
import React, { useState } from 'react';

const baseUploadsUrl = `${import.meta.env.VITE_BACKEND_URL}/uploads/`;

const ReviewImages = ({ reviewImages }: { reviewImages: ReviewImageData[] }) => {
  const [loadMore, setLoadMore] = useState(3);

  const handleLoadMore = () => {
    setLoadMore(loadMore + 3);
  };

  const canLoadMore = loadMore < reviewImages.length;

  return (
    <div className="flex flex-col rounded-xl bg-white px-6 py-8">
      <h2 className="text-2xl font-medium text-primary">Images</h2>
      <div className="my-5 h-px w-full bg-gray-200" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviewImages.slice(0, loadMore).map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger className="group relative mt-auto flex h-[300px] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 bg-white text-gray-400 transition">
              <img src={`${baseUploadsUrl}medium_${image.hash}.avif`} alt={image.name} className="size-full object-cover" />
              <div className="absolute z-10 size-full bg-black opacity-0 transition group-hover:opacity-50" />
              <div className="absolute z-10 flex size-full items-center justify-center opacity-0 transition group-hover:opacity-100">
                <ExpandIcon />
              </div>
            </DialogTrigger>
            <DialogContent className="shadow-no border-none bg-transparent p-0">
              <img
                src={`${baseUploadsUrl}${image.path}`}
                alt={image.name}
                className="max-h-[calc(100vh_-_100px)] max-w-[calc(100vw_-_100px)] object-cover"
              />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {canLoadMore && (
        <Button className="mx-auto mt-4 w-60" onClick={handleLoadMore}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default ReviewImages;
