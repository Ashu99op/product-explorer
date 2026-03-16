# Product Explorer Implementation Plan

We are building a "Product Explorer" using Next.js (App Router), React Hooks, and Tailwind CSS. The application will fetch product data from `https://fakestoreapi.com/products` and allow users to search, smart filter, and sort.

## Proposed Changes

### Configuration and Types
- **Types**: Define `Product` interface to match the API response (`id`, `title`, `price`, `description`, `category`, `image`).

### Utilities (`app/products/utils/`)
#### [NEW] `app/products/utils/filterProducts.ts`
- Implement sorting logic (Price L-H, H-L, Title A-Z).
- Implement basic search filtering (checking title and category).
- Implement smart filtering logic to parse natural queries like "cheap products" (< $50), "products under X", "[category] only".

#### [NEW] `app/products/utils/debounce.ts`
- Create a reusable debounce hook or function to optimize text input.

### UI Components (`app/products/components/`)
#### [NEW] `app/products/components/ProductCard.tsx`
- A responsive card displaying product image, title, price, and category. Use Next.js `Image` component or standard `img` tag with object-fit.

#### [NEW] `app/products/components/SearchBar.tsx`
- Standard search input (debounced) passing value back to parent.

#### [NEW] `app/products/components/SortDropdown.tsx`
- Select element for choosing the sort order.

### Main View and Routing
#### [NEW] `app/products/components/ProductExplorer.tsx`
- Client Component (`"use client"`).
- Takes initial product data as props.
- Maintains state for `searchQuery`, `smartFilterQuery`, and `sortOption`.
- Uses `useMemo` to compute the finalized list of products to display, avoiding unnecessary re-renders.

#### [NEW] [app/products/page.tsx](file:///c:/Users/Ashutosh/Desktop/Practicle/my-app/app/products/page.tsx)
- Server Component.
- Fetches data from `https://fakestoreapi.com/products` on the server-side.
- Passes the data to `<ProductExplorer initialProducts={products} />`.

## Verification Plan

### Automated/Manual Tests
- **Build**: Run `npm run build` to ensure no TypeScript or Next.js build errors.
- **Browser Testing**: Run Next.js dev server `npm run dev` and navigate to `http://localhost:3000/products`.
- **Functionality Verification**:
  1. Verify the grid layout renders 20 product cards initially.
  2. Type "electronics" in the standard search and verify the list instantly (or with debounce) filters to only electronics items.
  3. Change Sort Dropdown to "Price: Low -> High" and verify the leftmost top product has the lowest price.
  4. Type "jewelery under 50" in the Smart Filter and verify the results match the criteria.
  5. Check console for any hydration mismatch or React key errors.
