interface ReviewDescriptionProps {
  reviewDescription: string;
  restaurantName: string;
}

const ReviewDescription = ({ reviewDescription, restaurantName }: ReviewDescriptionProps) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white px-6 py-8">
      <span className="text-2xl font-medium text-primary">{restaurantName} review</span>
      <div className="my-5 h-px w-full bg-gray-200" />
      <span>{reviewDescription}</span>
    </div>
  );
};

export default ReviewDescription;
