import React from 'react';
import { SearchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="h-16 md:h-20 shadow-lg item-center">
      <div className="flex justify-between w-11/12 max-w-6xl m-auto p-4 md:p-6">
        <div className="flex flex-row p-1 object-left">
          <p>Logo</p>
          <div className="flex flex-row pl-6"> 
            <p className="pr-2">Home</p>
            <p>Address</p>
          </div>
        </div>
        <div className="mob:hidden flex flex-row p-1 object-right">
          <div className="mr-10">
            <Link to='/search'>
              <div className="group flex flex-row items-center  " >
                <SearchIcon className="h-5 w-5 text-gray-500 group-hover:text-yellow-400  "/>
                <p className="ml-1 font-medium text-gray-500 text-lg group-hover:text-yellow-400">Search</p>
              </div>
            </Link>
          </div>
          <div className="ml-10 mr-10 group flex flex-row items-center">
            <UserIcon className="h-5 w-5 text-gray-500 group-hover:text-yellow-400"/>
            <p className="ml-1 font-medium text-gray-500 text-lg group-hover:text-yellow-400">User</p>
          </div>
          <div className="ml-10 group flex flex-row items-center">
            <ShoppingBagIcon className="h-5 w-5 text-gray-500 group-hover:text-yellow-400"/>
            <p className="ml-1 font-medium text-gray-500 text-lg group-hover:text-yellow-400">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;