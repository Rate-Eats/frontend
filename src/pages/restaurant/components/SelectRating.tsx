import HalfStarIcon from '@assets/svgs/icons/halfStar.svg?react';
import { UseFormReturn } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

interface SelectRatingProps {
  form: UseFormReturn<{
    food: number;
    service: number;
    price: number;
    ambience: number;
    image: File[];
    description: string;
  }>;
  ratingType: 'food' | 'service' | 'price' | 'ambience';
}

const SelectRating = ({ form, ratingType }: SelectRatingProps) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleStarHover = (index: number) => {
    setHoverIndex(index);
  };

  const handleStarLeave = () => {
    if (form.getValues(ratingType) !== -1) {
      setHoverIndex(form.getValues(ratingType));
    } else {
      setHoverIndex(-1);
    }
  };

  const starArray = Array.from({ length: 10 }, (_, index) => (index + 1) / 2);

  useEffect(() => {
    handleStarLeave()
  }, []);

  return (
    <div className="flex cursor-pointer">
      {starArray.map((value) => {
        return (
          <button
            type="button"
            key={value}
            className={`${value % 1 === 0 && '-scale-x-100'} group h-5`}
            onMouseEnter={() => handleStarHover(value)}
            onMouseLeave={handleStarLeave}
            onClick={() => {
              form.setValue(ratingType, value);
              setHoverIndex(value);
            }}
          >
            <HalfStarIcon className={`transition  ${hoverIndex >= value ? 'text-primary' : 'text-blue-200'}`} />
          </button>
        );
      })}
    </div>
  );
};

export default SelectRating;
