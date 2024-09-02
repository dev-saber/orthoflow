import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="shadow-sm border border-solid rounded-lg border-gray-300">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-3.5">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            className="py-3 pl-10 pr-20 h-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue"
            type="text"
            placeholder="Type a name"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
