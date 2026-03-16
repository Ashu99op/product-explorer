'use client';

import { useState, useMemo } from 'react';
import { Product, SortOption } from '../types';
import SearchBar from './SearchBar';
import SmartFilter from './SmartFilter';
import SortDropdown from './SortDropdown';
import ProductCard from './ProductCard';
import { useDebounce } from '../hooks/useDebounce';
import { filterAndSortProducts } from '../utils/filterProducts';

interface ProductExplorerProps {
  initialProducts: Product[];
}

export default function ProductExplorer({ initialProducts }: ProductExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [smartFilterQuery, setSmartFilterQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const debouncedSmartFilterQuery = useDebounce(smartFilterQuery, 300);

  const displayedProducts = useMemo(() => {
    return filterAndSortProducts(
      initialProducts,
      debouncedSearchQuery,
      debouncedSmartFilterQuery,
      sortOption
    );
  }, [initialProducts, debouncedSearchQuery, debouncedSmartFilterQuery, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Product Explorer
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Discover our amazing products. Use the smart filter to find exactly what you're looking for, fast.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-center gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SmartFilter value={smartFilterQuery} onChange={setSmartFilterQuery} />
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      <div className="mb-6 flex justify-between items-center text-sm text-gray-500 font-medium px-2">
        <span>Showing {displayedProducts.length} results</span>
        {(searchQuery || smartFilterQuery || sortOption) && (
          <button 
            onClick={() => {
              setSearchQuery('');
              setSmartFilterQuery('');
              setSortOption('');
            }}
            className="text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-full"
          >
            Clear Filters
          </button>
        )}
      </div>

      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter terms.</p>
        </div>
      )}
    </div>
  );
}
