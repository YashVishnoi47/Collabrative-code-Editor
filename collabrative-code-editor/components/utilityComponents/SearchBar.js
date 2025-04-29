import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-full max-w-[300px]">
      <input
        placeholder="Search..."
        type="text"
        name="text"
        className="w-full h-[45px] px-5 rounded-2xl border border-gray-300 outline-none transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] shadow-[0px_0px_20px_-18px_rgba(0,0,0,0.5)] hover:border-2 hover:shadow-[0px_0px_20px_-17px_rgba(0,0,0,0.5)] active:scale-[0.95] focus:border-gray-500"
      />
    </div>
  );
};

export default SearchBar;
