import React from 'react'
import sampleData from '@/sample-data/db/sample-data'
import ProductList from '@/components/shared/product/ProductList'
function page() {
  const title = 'Newest Arrivals'
  // console.log(sampleData.products)
  return (
      <div className="max-width-screen-xl mx-auto">
        <ProductList title = {title} data = {sampleData.products}/>
      </div>
  )
}

export default page
