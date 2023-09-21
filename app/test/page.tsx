import Products from './products';

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

/**
 * Server component
 * with async fetch data
 */
export default async function Page() {
  const data = await fetch('https://dummyjson.com/products');

  if (data.status !== 200) return <p className='p-10'>error {data.status}</p>;

  const products: Product[] = (await data.json())?.products || [];

  return (
    <div className='p-10'>
      <Products products={products} />
    </div>
  );
}
