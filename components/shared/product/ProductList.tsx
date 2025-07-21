import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types'
function ProductList({title, data}: {title: string, data: Product[]}) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <h2 className='h2-bold text-center py-10'>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {data.map((product:Product)=>
            <ProductCard key={product.slug} product={product}/>)}
      </div>
    </div>
  )
}

export default ProductList
