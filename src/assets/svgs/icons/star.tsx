import { v4 as uuidv4 } from 'uuid';
import React from 'react';

interface StarProps {
  filledPercent: number;
}

const StarIcon = ({ filledPercent }: StarProps) => {
  const gradientId = `grad-${uuidv4()}`;

  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId}>
          <stop offset={`${filledPercent}%`} stopColor="#1B69FD" />
          <stop offset={0} stopColor="#1B69FD" stopOpacity="20%" />
        </linearGradient>
      </defs>
      <path
        d="M8.57849 0.388184L11.2978 5.02456L16.5785 6.16012L12.9785 10.1611L13.5228 15.4993L8.57849 13.3357L3.63422 15.4993L4.17849 10.1611L0.578491 6.16012L5.85914 5.02456L8.57849 0.388184Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export default StarIcon;
