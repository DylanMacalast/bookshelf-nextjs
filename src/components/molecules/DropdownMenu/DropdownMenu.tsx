'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

type DropDownProps = {
  label: string;
  value: string;
  onClick?: () => void;
};

type DropdownMenuProps = {
  menuItems: DropDownProps[];
  buttonIcon?: JSX.Element;
  buttonText?: string;
};
const DropdownMenu = ({
  menuItems,
  buttonIcon,
  buttonText
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative flex flex-col" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        {buttonIcon && buttonIcon}
        {buttonText}
      </button>
      {isOpen && (
        <div className="absolute bg-gray-100  top-14 right-0 rounded  shadow min-w-[130px]">
          <ul className="w-full">
            {menuItems.map((item) => (
              <li
                className="hover:bg-white w-full p-3 rounded transition-all cursor-pointer text-center"
                key={item.value}
              >
                {item.onClick ? (
                  <button onClick={item?.onClick}>{item?.label}</button>
                ) : (
                  <Link href={item?.value}>{item?.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
