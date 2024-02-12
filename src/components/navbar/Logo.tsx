import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center gap-3 text-lg">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-white">R</div>
      <span className="whitespace-nowrap">Rate Eats</span>
    </Link>
  );
};

export default Logo;
