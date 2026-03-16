import { Product, SortOption } from '../types';

/**
 * Parses natural language query strings to find price limits and category names.
 */
function parseSmartFilter(query: string): { limit?: number; categoryMatch?: string } {
  const normalizedMatch = query.toLowerCase();
  
  // Extract number for price limits. e.g., "under 50", "below 20"
  const limitMatch = normalizedMatch.match(/(?:under|below|less than|cheap|cheaper than)\s*\$?(\d+)/i) 
    || normalizedMatch.match(/(\d+)/); // fallback if they just type a number

  let limit;
  if (limitMatch && limitMatch[1]) {
      limit = parseFloat(limitMatch[1]);
  } else if (normalizedMatch.includes('cheap')) {
      limit = 50; // Arbitrary "cheap" threshold
  }

  // Common categories from the api to look for
  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  let categoryMatch;
  for (const cat of categories) {
    if (normalizedMatch.includes(cat.toLowerCase())) {
        categoryMatch = cat;
        break;
    }
  }

  return { limit, categoryMatch };
}

export function filterAndSortProducts(
  products: Product[],
  searchQuery: string,
  smartFilterQuery: string,
  sortOption: SortOption
): Product[] {
  let result = [...products];

  // 1. Standard Search
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }

  // 2. Smart Filter
  if (smartFilterQuery.trim() !== '') {
    const { limit, categoryMatch } = parseSmartFilter(smartFilterQuery);

    if (limit !== undefined) {
      result = result.filter((p) => p.price <= limit);
    }
    
    if (categoryMatch) {
      result = result.filter((p) => p.category.toLowerCase() === categoryMatch.toLowerCase());
    }
  }

  // 3. Sorting
  if (sortOption) {
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }

  return result;
}
