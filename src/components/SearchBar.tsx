"use client";

import { useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search",
}) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleClear = () => {
    setSearch("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div>
          <input
            type="text"
            name="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="p-2 bg-[#F5A76B] text-black rounded-xl md:rounded-[2vw] w-full"
          />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-black-75"
            >
              X
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black px-3 py-1 text-sm rounded-lg md:rounded-[1vw]"
          >
            <SearchSharpIcon />
          </button>
        </div>
      </form>
    </>
  );
};
