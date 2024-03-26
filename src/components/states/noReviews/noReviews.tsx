import NoReviewsIcon from '@assets/svgs/states/noReviews.svg?react';

interface NoReviewsProps {
  handleModalVisibility: (value?: boolean) => void;
}

const NoReviews = ({ handleModalVisibility }: NoReviewsProps) => {
  return (
    <div className="mx-auto flex h-full w-72 flex-col items-center justify-center gap-8">
      <NoReviewsIcon />
      <div className="flex flex-col items-center gap-4 text-center leading-3">
        <span className="text-xl font-bold text-gray-700">No Reviews Yet</span>
        <span className="text-lg font-medium leading-6 text-gray-600">
          Be the first to share your thoughts! Add your review below.
        </span>
      </div>
      <button
        className="h-14 w-full rounded-full bg-primary text-xl font-medium text-white"
        onClick={() => handleModalVisibility(true)}
      >
        Add review
      </button>
    </div>
  );
};

export default NoReviews;
