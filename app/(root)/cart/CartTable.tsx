'use client'
import { Cart } from '@/types'
import Link from 'next/link'
import React, { useTransition } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import ProductIncreaseButton from '@/components/shared/product/product-buttons/ProductIncreaseButton'
import ProductDecreaseButton from '@/components/shared/product/product-buttons/ProductDecreaseButton'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
function CartTable({cart}: {cart: Cart}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className='grid gap-y-5 md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <h2 className='h2-bold py-4'>Shopping Cart</h2>
          {!cart || cart.items.length === 0?
          (<div className='font-semibold'>Cart is empty! <Link href='/'>Go Shopping</Link></div>):
          (<Table>
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
                  <div className="flex items-center gap-2">
                    <Image src = {item.image} alt = {item.name} width={50} height={50}/>
                    <div>{item.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 -ml-5">
                    <ProductDecreaseButton item = {item}/>
                    <span className='font-medium'>{item.qty}</span>
                    <ProductIncreaseButton item = {item}/>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='font-medium'>${item.price}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </div>
      <div className="">
        <Card>
          <CardContent className='p-4 gap-4'>
            <div className='pb-3 text-xl'>
              Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
              {formatCurrency(cart.itemsPrice)}
            </div>
            <Button
              onClick={() => startTransition(() => router.push('/shipping-address'))}
              className='w-full'
              disabled={isPending}
              >
              {isPending ? (
                <Loader className='animate-spin w-4 h-4' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}
              Proceed to Checkout
            </Button>
          </CardContent>
      </Card>
        </div>
    </div>
  )
}

export default CartTable
