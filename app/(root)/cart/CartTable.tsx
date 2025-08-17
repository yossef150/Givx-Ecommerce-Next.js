import { Cart } from '@/types'
import Link from 'next/link'
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
function CartTable({cart}: {cart?: Cart}) {
  return (
    <div className='grid md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <h2 className='h2-bold py-4'>Shopping Cart</h2>
          {!cart || cart.items.length === 0?
          (<div className='font-semibold'>Cart is empty! <Link href='/'>Go Shopping</Link></div>):
          (<Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>
                  <div className="flex items-center">
                    <Image src = {item.image} alt = {item.name} width={50} height={50}/>
                    <div>{item.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Image src = {item.image} alt = {item.name} width={50} height={50}/>
                    <div>{item.name}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
    </div>
  )
}

export default CartTable
