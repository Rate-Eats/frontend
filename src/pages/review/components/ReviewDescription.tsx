interface ReviewDescriptionProps {
  reviewDescription: string;
}

const ReviewDescription = ({ reviewDescription }: ReviewDescriptionProps) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">Review</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <span>{reviewDescription}</span>
    </div>
  );
};

export default ReviewDescription;
