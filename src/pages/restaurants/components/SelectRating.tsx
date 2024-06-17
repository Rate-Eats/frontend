import HalfStarIcon from '@assets/svgs/icons/halfStar.svg?react';
import React, { useEffect, useState } from 'react';

interface SelectRatingProps {
  onChangeFunction: (value: number) => void;
  value: number;
  maximumValue?: number;
  minimumValue?: number;
}

const SelectRating = ({ onChangeFunction, value, maximumValue, minimumValue }: SelectRatingProps) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  const handleStarHover = (index: number) => {
    if (minimumValue && minimumValue > index) return;
    if (maximumValue && maximumValue < index) return;
    setHoverIndex(index);
  };

  const handleStarLeave = () => {
    if (hoverIndex !== -1) {
      setHoverIndex(value);
    } else {
      setHoverIndex(-1);
    }
  };

  useEffect(() => {
    setHoverIndex(value);
  }, [value]);

  const starArray = Array.from({ length: 10 }, (_, index) => (index + 1) / 2);

  useEffect(() => {
    handleStarLeave();
  }, []);

  return (
    <div className="flex h-6 cursor-pointer">
      {starArray.map((value) => {
        return (
          <button
            type="button"
            key={value}
            className={`${value % 1 === 0 && '-scale-x-100'} group h-6`}
            onMouseEnter={() => handleStarHover(value)}
            onMouseLeave={handleStarLeave}
            onClick={() => {
              onChangeFunction(value);
              setHoverIndex(value);
            }}
            aria-label={`rating value: ${value} `}
          >
            <HalfStarIcon className={`transition  ${hoverIndex >= value ? 'text-primary' : 'text-blue-200'}`} />
          </button>
        );
      })}
    </div>
  );
};

export default SelectRating;
