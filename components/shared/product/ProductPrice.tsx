import { cn } from '@/lib/utils';
import React from 'react'

function ProductPrice({price, className}: {price: number, className?: string}) {
    const newPrice = price.toFixed(2);
    const [intValue, floatValue] = newPrice.split('.');
  return (
    <div className={cn('text-2xl', className)}>
      <span className='align-super text-xs'>$</span>
        {intValue}
      <span className='align-super text-xs'>{floatValue}</span>
    </div>
  )
}

export default ProductPrice
