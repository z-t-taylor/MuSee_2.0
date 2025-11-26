"use client";

export type FilterType =
  | "all"
  | "paintings"
  | "ceramics"
  | "sculpture"
  | "prints"
  | "photographs"
  | "furniture";

interface FilterArtworksProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterArtworks: React.FC<FilterArtworksProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const filters: FilterType[] = [
    "all",
    "paintings",
    "ceramics",
    "sculpture",
    "prints",
    "photographs",
    "furniture",
  ];

  const formatFilterLabel = (filter: FilterType) => {
    return filter.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          aria-pressed={currentFilter === filter}
          className={`
          px-4 py-2 rounded-4xl border 
          transition-all duration-200 ease-in-out
          whitespace-nowrap cursor-pointer
          ${
            currentFilter === filter
              ? "bg-[#A9CBEF88] text-[#2d1707] border-none"
              : "bg-[#e29f6c38] border-none hover:bg-[#e29f6c82] "
          }
        `}
        >
          {formatFilterLabel(filter)}
        </button>
      ))}
    </div>
  );
};
