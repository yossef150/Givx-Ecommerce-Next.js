import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from './ProductPrice'
import ProductRating from './ProductRating'
import { Product } from '@/types'

function ProductCard({product} : {product: Product}) {
  return (
     <Card>
        <CardHeader className='p-0 flex-center'>
            <Link href={`product/${product.slug}`}>
                <Image src={product.images[0]} alt={product.name} width={300} height={300} priority = {true}/>
            </Link>
        </CardHeader>
    <CardContent className='p-4 grid gap-3'>
        <p className='text-xs'>{product.brand}</p>
        <p className='text-sm'>{product.name}</p>
        <div className="flex-between text-sm">
            <ProductRating rating={Number(product.rating)}/>
            {product.stock>0? <ProductPrice price={Number(product.price)}/>
             : <p className='text-destructive'>Out of Stock</p>}
        </div>
    </CardContent>
    </Card>
  )
}

export default ProductCard
