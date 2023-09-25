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

  /* getting unique categories */
  const categories = [...new Set(products.map((product) => product.category))];
  console.log(categoriesFilter);

  /* filtering products */
  const productsFiltered = useMemo(() => {
    /* regex from search query */
    const searchRegExp = new RegExp(
      search.replace(/,\s*/g, '|').replace(/\s+/g, '.*'),
      'i'
    );
    setPage(0);
    console.log(search);
    return products.filter((product) => {
      // Check category filter for products category
      if (categoriesFilter === product.category) {
        console.log('filtered');
        // If category filter then check that the product has same category then either title & description
        return (
          product.category === categoriesFilter &&
          (searchRegExp.test(product.title) ||
            searchRegExp.test(product.description))
        );
        // Check for search state
      } else if (search) {
        console.log('unfiltered');
        // if search state then check that the search value matches the title/category/description
        return (
          searchRegExp.test(product.title) ||
          searchRegExp.test(product.category) ||
          searchRegExp.test(product.description)
        );
        // if nothing then return all products
      } else {
        return true;
      }
    });
  }, [products, search, categoriesFilter]);

  return (
    <div>
      <div className='grid gap-2'>
        <div>
          <Search
            search={search}
            setSearch={setSearch}
            categories={categories}
          />
        </div>
        <div>
          <ul className='flex gap-1 flex-wrap text-gray-800'>
            {/* Added button to show all products if locked on category */}
            <li className={'bg-gray-200 p-1 rounded'}>
              <button
                className='focus:outline-none'
                onClick={() => {
                  setSearch('');
                }}
              >
                All products
              </button>
            </li>
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
                    // VER 0.1
                    // const searchValue = new Set(search.split(/,\s*/));
                    // if (searchValue.has(category)) searchValue.delete(category);
                    // else searchValue.add(category);
                    // searchValue.delete('');
                    // setSearch(Array.from(searchValue).join(', '));

                    // VER 0.2
                    // if (search.includes(category)) return;
                    // setSearch(category);

                    // VER 0.3
                    search.includes(category) ? null : setSearch(category);
                    setCategoriesFilter(category);
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
  categories,
}: {
  search: string;
  setSearch: (search: string) => void;
  categories: Array<string>;
}) {
  return (
    <input
      className='text-gray-800 p-1 block mb-4 rounded-md w-full'
      placeholder='Search ...'
      type='search'
      value={categories.includes(search) ? '' : search}
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
