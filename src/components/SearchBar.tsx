"use client";

import { useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search..",
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
      <form onSubmit={handleSubmit} className="my-4 mx-4">
        <div className="relative">
          <input
            type="text"
            name="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="py-2 px-10 bg-[#e29f6c] text-[#2d1707] rounded-xl md:rounded-[2vw] w-full"
          />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-black-75"
            >
              X
            </button>
          )}
          <button
            type="submit"
            className="absolute top-1/2 right-2 -translate-y-1/2 transform px-3 py-1 text-sm"
          >
            <SearchSharpIcon />
          </button>
        </div>
      </form>
    </>
  );
};
