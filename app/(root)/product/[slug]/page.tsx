import ProductPrice from '@/components/shared/product/ProductPrice';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductImage from '@/components/shared/product/ProductImage';
import ProductCart from '@/components/shared/product/ProductCart';
import { getMyCart } from '@/lib/actions/cart.actions';

async function page(props : {params: Promise<{slug: string}>}) {
    const {slug} = await props.params;
    const product = await getProductBySlug(slug);
    const cart = await getMyCart();
    // console.log(product?.brand, product?.name)
    if(!product) return notFound();
  return (
    <section>
      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
        <div className="col-span-2">
          {/* Images here */}
          <ProductImage images={product.images}/>
        </div>
        <div className="col-span-2 space-y-4">
          {/* details here */}
          <p className='text-xs'>{product.brand} {product.category}</p>
          <p className="font-semibold">{product.name}</p>
          <p className='text-sm'>{product.rating} stars of {product.numReviews} reviews</p>
          <ProductPrice price={Number(product.price)} className='rounded-full bg-green-100 text-green-600 w-[70] text-center'/>
          <p className='text-xs'>Description:<br />{product.description}</p>
        </div>
        <div className="lg:col-span-1 w-10/12 md:col-start-2 md:col-end-4 mx-auto md:w-full">
          {/* price action here */}
          <Card>
            <CardContent className='flex flex-col justify-between gap-2'>
              <div className="flex justify-between">
                <span className='font-semibold'>Price</span>
                <ProductPrice price={Number(product.price)}/>
              </div>
              <div className="flex justify-between">
                <span className='font-semibold'>Status</span>
                {product.stock>0? <Badge variant='outline'>In Stock</Badge>:
                  <Badge variant='destructive'>Out Of Stock</Badge>
                }
              </div>
              <div className='flex justify-between'>
                {product.stock> 0 && <ProductCart cart = {cart} item={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  qty: 1,
                  image: product.images![0],
                }}/>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default page
