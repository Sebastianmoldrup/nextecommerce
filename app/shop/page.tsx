import Image from 'next/image';
import data from '@/app/_data/sneakers.json';
import Link from 'next/link';

export default function Shop() {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='shop-container'>
          {data.sneakers.map((sneaker, index) => (
            <div key={sneaker.product_template_id} className='shop-card'>
              <a className='block relative h-48 overflow-hidden shop-card__image'>
                <Image
                  alt={sneaker.slug}
                  width={250}
                  height={250}
                  className='object-cover object-center w-full h-full block rotate-12'
                  src={sneaker.main_picture_url}
                  style={{ objectFit: 'contain' }}
                />
              </a>

              <div className='shop-card__info'>
                <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1 '>
                  {sneaker.category[0]}
                </h3>

                <h2 className='text-gray-900 title-font text-lg font-medium'>
                  {sneaker.name}
                </h2>
              </div>

              <div className='mt-4 shop-card__price'>
                <div className='flex items-center justify-between'>
                  <p className='mt-1'>
                    ${(sneaker.retail_price_cents ?? 0) / 100}
                  </p>
                  <div className='flex gap-x-2'>
                    <Link
                      href={`/shop/${sneaker.slug}`}
                      className='py-2 px-4 bg-accent-foreground text-white hover:bg-accent hover:text-accent-foreground hover:cursor-pointer'
                    >
                      More
                    </Link>
                    <div className='py-2 px-4 bg-accent-foreground text-white hover:bg-accent hover:text-accent-foreground hover:cursor-pointer'>
                      Add to cart
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
