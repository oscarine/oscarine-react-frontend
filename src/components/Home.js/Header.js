import React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

function Header() {
  return (
    <div className="h-20 shadow-lg">
      <div className="flex justify-between w-11/12 max-w-6xl m-auto p-6">
        <div className="flex flex-row p-1 object-left">
          <p>Logo</p>
          <div className="flex flex-row pl-6"> 
            <p className="pr-2">Home</p>
            <p>Address</p>
          </div>
        </div>
        <div className="flex flex-row p-1 object-right">
          <div>
            <SearchIcon className="h-5 w-5 text-blue-500"/>
            <p className="pr-4">Search</p>
          </div>
          <p className="pr-4">Offer</p>
          <p className="pr-6">Help</p>
          <p>Cart</p>
        </div>
      </div>
    </div>
  )
}

export default Header;