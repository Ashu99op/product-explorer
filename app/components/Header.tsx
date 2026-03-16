'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                MyApp
              </Link>
            </div>
            <nav className="ml-6 flex items-center space-x-4">
              <Link
                href="/products"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/products'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                Products
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
