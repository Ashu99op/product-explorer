import Image from 'next/image';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full p-4 bg-white flex items-center justify-center border-b border-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <button className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
