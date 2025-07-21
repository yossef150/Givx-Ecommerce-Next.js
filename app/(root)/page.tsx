import React from 'react'
import ProductList from '@/components/shared/product/ProductList'
import { getLatestCollection } from '@/lib/actions/product.actions'
async function page() {
  const title = 'Newest Arrivals'
  const latestProducts = await getLatestCollection();
  return (
      <div className="max-width-screen-xl mx-auto">
        <ProductList title = {title} data = {latestProducts}/>
      </div>
  )
}

export default page
