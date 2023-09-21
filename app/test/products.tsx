'use client';
import { useState, useMemo } from 'react';
import type { Product } from './page';
const pageSize = 10;
/**
 * Products list
 * Filterable and paginated
 */
export default function Products({ products }: { products: Product[] }) {
  /* search query */
  const [search, setSearch] = useState('');
  /* page index */
  const [page, setPage] = useState(0);
  /* state for category filter */
  /* TODO: use state for category */
  const [categoriesFilter, setCategoriesFilter] = useState<Set<string>>(
    new Set()
  );
  /* filtering products */
  const productsFiltered = useMemo(() => {
    /* regex from search query */
    const searchRegExp = new RegExp(
      search.replace(/,\s*/g, '|').replace(/\s+/g, '.*'),
      'i'
    );
    setPage(0);
    return products.filter(
      (product) =>
        /* TODO: add categoryFilter filter to if statement */
        // Categoryfilter check for category then search via category
        searchRegExp.test(product.title) ||
        searchRegExp.test(product.category) ||
        searchRegExp.test(product.description)
    );
  }, [products, search]);
  /* getting unique categories */
  const categories = [...new Set(products.map((product) => product.category))];
  return (
    <div>
      <div className='grid gap-2'>
        <div>
          <Search search={search} setSearch={setSearch} />
        </div>
        <div>
          <ul className='flex gap-1 flex-wrap text-gray-800'>
            {categories.map((category, index) => (
              <li
                className={
                  'bg-gray-200 p-1 rounded' +
                  (search && search.includes(category) ? ' bg-green-300' : '')
                }
                key={index}
              >
                <button
                  className='focus:outline-none'
                  onClick={() => {
                    /* TODO: redo */
                    // const searchValue = new Set(search.split(/,\s*/));
                    // if (searchValue.has(category)) searchValue.delete(category);
                    // else searchValue.add(category);
                    // searchValue.delete('');
                    // setSearch(Array.from(searchValue).join(', '));

                    // Update category filter
                    search.includes(category) ? null : setSearch(category);
                  }}
                  type='button'
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Nav page={page} setPage={setPage} productsFiltered={productsFiltered} />
      <ul className='grid gap-y-1.5'>
        {productsFiltered.slice(page, page + pageSize).map((product) => (
          <li
            className='bg-gray-200 text-gray-800 p-2 rounded-md'
            key={product.id}
          >
            <div className='flex gap-x-4 items-center justify-between'>
              <h2>{product.title}</h2>
              <div className='text-gray-500 text-xs'>{product.category}</div>
            </div>
            <div className='text-xs text-gray-600'>{product.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
/**
 * Search input
 */
function Search({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) {
  return (
    <input
      className='text-gray-800 p-1 block mb-4 rounded-md w-full'
      placeholder='Search ...'
      type='search'
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
}
/**
 * Pagination buttons
 */
function Nav({
  page,
  setPage,
  productsFiltered,
}: {
  page: number;
  setPage: (page: number) => void;
  productsFiltered: Product[];
}) {
  return (
    <div className='flex gap-x-4 my-4'>
      <button
        className='bg-gray-200 text-gray-800 p-1 rounded-md disabled:opacity-50'
        disabled={page === 0}
        onClick={() => {
          setPage(page - pageSize);
        }}
      >
        Previous
      </button>
      <button
        className='bg-gray-200 text-gray-800 p-1 rounded-md disabled:opacity-50'
        disabled={page + pageSize >= productsFiltered.length}
        onClick={() => {
          setPage(page + pageSize);
        }}
      >
        Next
      </button>
    </div>
  );
}
