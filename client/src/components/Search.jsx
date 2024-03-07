import React from 'react';

const Search = () => {
  return (
    <div className="relative bg-red p-8">
      <div className=""> {/* Adjust max-width as needed */}
        {/* Black card */}
        <div className="bg-blue p-6 rounded w-250px "> {/* Increase padding for a larger card */}
          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            className="bg-white text-black rounded p-2 mb-4 block w-full"
          />
          {/* Buttons container */}
          <div className="flex items-center justify-between mt-4">
            {/* Number of people selection */}
            <button className="bg-white text-black rounded p-2 mr-2">Select Number of People</button>

            {/* Calendar selection */}
            <button className="bg-white text-black rounded p-2">Select Calendar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
