import HamburgerMenuIcon from '@assets/svgs/icons/hamburgerMenu.svg?react';
import Navigation from '@components/navbar/Navigation.tsx';
import Logo from '@components/navbar/Logo.tsx';
import User from '@components/navbar/User.tsx';
import { useState } from 'react';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(true);

  return (
    <header className="border-gray-200 bg-white px-2 py-4 dark:bg-gray-800 md:px-4 lg:px-10 shadow-lg z-10">
      <div className="mx-auto flex  flex-wrap items-center justify-between gap-4 lg:gap-10">
        <Logo />
        <Navigation openDropdown={openDropdown} />
        <div className="flex items-center gap-2 md:gap-7">
          <User />
          <button
            className="cursor-pointer rounded-md p-1 hover:bg-gray-200 lg:hidden"
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <HamburgerMenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
