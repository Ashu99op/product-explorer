import { Product } from '../types';
import ProductExplorer from '../components/ProductExplorer';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products', {
    // Next.js static fetching by default unless revalidated or dynamic.
    // Use next: { revalidate: ... } or cache: 'no-store' if dynamic data is expected.
    // For this exact static endpoint, default is fine.
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="font-sans text-gray-900">
      <ProductExplorer initialProducts={products} />
    </div>
  );
}