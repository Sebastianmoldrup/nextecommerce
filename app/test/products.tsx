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
  // console.log('filter: ', categoriesFilter);
  // console.log('search: ', search);
  console.log(categoriesFilter);

  /* filtering products */
  const productsFiltered = useMemo(() => {
    /* regex from search query */
    const searchRegExp = new RegExp(
      search.replace(/,\s*/g, '|').replace(/\s+/g, '.*'),
      'i'
    );
    setPage(0);
    return products.filter((product) => {
      const filter = [...categoriesFilter];
      if (filter.length > 0) {
        return (
          categoriesFilter.has(product.category) &&
          (searchRegExp.test(product.title) ||
            searchRegExp.test(product.description))
        );
      } else if (search === '') {
        return true;
      } else {
        return (
          searchRegExp.test(product.title) ||
          searchRegExp.test(product.description) ||
          searchRegExp.test(product.category)
        );
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
                  const x = new Set(categoriesFilter);
                  x.clear();
                  setCategoriesFilter(x);
                }}
              >
                All products
              </button>
            </li>
            {categories.map((category, index) => (
              <li
                className={
                  'bg-gray-200 p-1 rounded' +
                  (categoriesFilter.size > 0 && categoriesFilter.has(category)
                    ? ' bg-green-300'
                    : '')
                }
                key={index}
              >
                <button
                  className='focus:outline-none'
                  onClick={() => {
                    /* TODO: redo */

                    // search.includes(category) ? null : setSearch(category);
                    // const setFilter = new Set(categoriesFilter);
                    // categoriesFilter.has(category)
                    //   ? setFilter.delete(category)
                    //   : setFilter.add(category);
                    // setCategoriesFilter(setFilter);
                    setCategoriesFilter((x) => {
                      const setFilter = new Set(x);
                      if (x.has(category)) {
                        setFilter.delete(category);
                      } else {
                        setFilter.add(category);
                      }
                      return setFilter;
                    });
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
