import SearchIcon from '@/assets/svgs/icons/search.svg?react';
import { GanttChartSquare } from 'lucide-react';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  openDropdown: boolean;
}

const Navigation = ({ openDropdown }: NavigationProps) => {
  return (
    <div
      className={`order-last flex w-full flex-grow flex-col items-center text-lg lg:order-none lg:flex lg:w-auto lg:flex-row ${
        openDropdown && 'hidden'
      }`}
    >
      <ul className="order-2 mr-auto mt-4 flex flex-col gap-5 lg:order-none lg:mt-0 lg:flex-row">
        <li className="group flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-primary">
          <Link to={'/restaurants'}>
            <Utensils size={16} strokeWidth={1.5} color="black" className="group-hover:stroke-primary" />
            Restaurants
          </Link>
        </li>
        <li className="group flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-primary">
          <Link to={'/reviews'}>
            <GanttChartSquare size={16} strokeWidth={1.5} color="black" className="group-hover:stroke-primary" />
            Reviews
          </Link>
        </li>
      </ul>
      <div className="relative order-first w-full rounded-md border bg-[#F5F6F7] px-4 py-1 lg:order-none lg:w-auto">
        <input placeholder="Search here..." className="w-full bg-transparent pl-5 text-sm outline-none" />
        <div className="absolute bottom-0 left-2 top-0 flex items-center">
          <SearchIcon className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
