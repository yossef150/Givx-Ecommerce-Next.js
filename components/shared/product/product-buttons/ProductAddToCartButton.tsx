'use client'
import { Button } from '@/components/ui/button'
import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

function ProductAddToCartButton({item}: {item: CartItem}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleAddToCart = async () => {
    startTransition(async()=>{
      const res = await addItemToCart(item);
      if(res.success)
      {
         toast(res.message, {
            action: {
              label: "Go To Cart",
              onClick: () => router.push("/cart"), // client-side navigation
            },
         });
      }
      else{
         toast.error(res.message);
      }
    })
  }
  return (
    <Button
      onClick={() => {handleAddToCart()}}
      className="w-full"
      disabled = {isPending}
    >
      <Plus/>
      Add to Cart
    </Button>
  )
}

export default ProductAddToCartButton
