import NotificationIcon from '@/assets/svgs/icons/notification.svg?react';
import ArrowDownIcon from '@/assets/svgs/icons/arrowDown.svg?react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@auth/useAuth.ts';
import { Link } from 'react-router-dom';

const User = () => {
  const [open, setOpen] = useState(false);
  const { userData, onLogout } = useAuth();
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ulRef.current && !ulRef.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  if (!userData) {
    return (
      <div className="flex gap-2">
        <Link to="/login">
          <button className="w-[90px] rounded-sm border border-primary py-1 text-primary md:w-[130px] md:py-1.5">
            Log in
          </button>
        </Link>
        <Link to="/register">
          <button className="w-[90px] rounded-md bg-primary py-1 text-white md:w-[130px] md:py-1.5">Register</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <div className="cursor-pointer">
        <NotificationIcon />
      </div>
      <div className="relative flex items-center gap-3">
        {userData.user.avatar ? (
          <img
            src={`http://localhost:1337/uploads/${userData.user.avatar}`}
            className="h-10 w-10 cursor-pointer rounded-full"
            alt={'avatar'}
          />
        ) : (
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary capitalize text-white">
            {userData.user.username.slice(0, 1)}
          </div>
        )}

        <div className=" hidden flex-col lg:flex">
          <span className="text-sm">{userData.user.username}</span>
          <span className="text-xs text-gray-700">{userData.user.email}</span>
        </div>
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          <ArrowDownIcon />
        </button>

        <ul
          ref={ulRef}
          className={`absolute right-0 top-12 w-44 rounded-sm bg-white p-3 shadow lg:left-0 lg:w-auto ${!open && 'hidden'}`}
        >
          <div className="flex flex-col p-2 lg:hidden">
            <span className="text-sm">{userData.user.username}</span>
            <span className="text-xs text-gray-700">{userData.user.email}</span>
          </div>
          <div className="my-3 h-px w-full bg-gray-200 lg:hidden" />
          <li className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100">Profile Settings</li>
          <li className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100">Profile Settings</li>
          <li className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100">Profile Settings</li>
          <li className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100">Profile Settings</li>
          <div className="my-3 h-px w-full bg-gray-200" />
          <li className="cursor-pointer rounded-lg p-2 transition hover:bg-gray-100" onClick={() => onLogout()}>
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
