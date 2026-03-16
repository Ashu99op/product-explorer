import { SortOption } from '../types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="w-full sm:w-auto mt-4 sm:mt-0 flex items-center">
      <label htmlFor="sort" className="mr-3 text-sm font-medium text-gray-700 whitespace-nowrap">
        Sort By:
      </label>
      <select
        id="sort"
        name="sort"
        className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl cursor-pointer shadow-sm bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <option value="">Default Relevance</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="title-asc">Title: A → Z</option>
      </select>
    </div>
  );
}
