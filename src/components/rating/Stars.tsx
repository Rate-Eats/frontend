import StarIcon from '@assets/svgs/icons/star.tsx';

interface StarsProps {
  rating: number;
}
const Stars = ({ rating }: StarsProps) => {
  rating = Math.round(rating * 100) / 100;
  const decimalPart = (rating % 1) * 100;

  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((star, index) => {
        return <StarIcon key={index} filledPercent={rating <= star ? 0 : rating >= star + 1 ? 100 : decimalPart} />;
      })}
    </div>
  );
};

export default Stars;
