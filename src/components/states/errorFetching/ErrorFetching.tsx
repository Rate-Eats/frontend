import NoPageFound from '@assets/svgs/states/noPageFound.svg?react';
import { useNavigate } from 'react-router-dom';
const ErrorFetching = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-full w-72 flex-col items-center justify-center gap-12">
      <NoPageFound />
      <div className="flex flex-col items-center text-center leading-3">
        <span className="text-xl font-bold text-gray-700">Oops!</span>
        <span className=" text-xl font-medium leading-6 text-gray-600">There was an error loading this restaurant</span>
      </div>
      <button
        className="h-14 w-full rounded-full bg-primary text-xl font-medium text-white"
        onClick={() => navigate('/')}
      >
        Go to homepage
      </button>
    </div>
  );
};

export default ErrorFetching;
