'use client';
import Link from 'next/link';
import { logout } from '../../../actions/auth';
import { UserIcon } from '../../atoms/Icons';
import DropdownMenu from '../../molecules/DropdownMenu/DropdownMenu';

const Header = ({ isAuth }: { isAuth: boolean }) => {
  const dropDownItems = [
    {
      label: 'Logout',
      value: 'logout',
      onClick: () => {
        logout();
      }
    },
    {
      label: 'Profile',
      value: 'profile'
    }
  ];
  return (
    <header className="p-4 bg-gray-100 text-gray-800">
      <div className="container flex justify-between h-16 mx-auto">
        <a
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          HOME
        </a>
        <ul className="items-stretch hidden space-x-3 md:flex">
          {!isAuth && (
            <>
              <li className="flex">
                <Link
                  rel="noopener noreferrer"
                  href="/register"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                >
                  Register
                </Link>
              </li>
              <li className="flex">
                <Link
                  rel="noopener noreferrer"
                  href="/login"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                >
                  Login
                </Link>
              </li>
            </>
          )}
          {isAuth && (
            <>
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="/book"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-yellow-600 border-yellow-600"
                >
                  My Books
                </a>
              </li>
              <li className="flex">
                <a
                  rel="noopener noreferrer"
                  href="/shelf-management"
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
                >
                  My Shelves
                </a>
              </li>
              <li className="flex justify-center items-center">
                <DropdownMenu
                  menuItems={dropDownItems}
                  buttonIcon={<UserIcon />}
                />
              </li>
            </>
          )}
        </ul>
        <button className="flex justify-end p-4 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
export default Header;
