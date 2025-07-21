'use client'

import React from 'react'
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

function ProductImage({images} : {images: string[]}) {
    const [current, setCurrent] = useState(0);
  return (
    <div className='flex flex-col gap-4'>
      <Image src={images[current]} className='min-w-[300]' alt='product image' width={400} height={400} />
      <div className='flex gap-2'>
        {images.map((image, index)=> 
        <Image key={index}
         onClick={()=> setCurrent(index)} 
         src={image} 
         className={cn('border-2 hover:border-orange-300 transition-all', index === current && 'border-orange-200')}
        alt='product image' width={80} height={80} />)}
      </div>
    </div>
  )
}

export default ProductImage
