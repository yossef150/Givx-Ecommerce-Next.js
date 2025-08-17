'use client'
import { Button } from '@/components/ui/button';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Loader, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

function ProductIncreaseButton({item}: {item: CartItem}) {
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
    <Button type="button" disabled = {isPending} variant="outline" onClick={handleAddToCart}>
        {isPending? <Loader className="animate-spin w-4 h-4"/>: <Plus className="w-4 h-4"/>}
    </Button>
  )
}

export default ProductIncreaseButton
