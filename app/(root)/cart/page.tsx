import CartTable from '@/app/(root)/cart/CartTable'
import { getMyCart } from '@/lib/actions/cart.actions';
import React from 'react'

export const metadata = {
  title: 'Shopping Cart',
};

async function page() {
  const cart = await getMyCart();
  return (
    <div className='w-10/12 mx-auto'>
      <CartTable cart = {cart}/>
    </div>
  )
}

export default page
