'use client'
import { Button } from '@/components/ui/button';
import { removeItemFromCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';
import { Loader, Minus } from 'lucide-react';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

function ProductDecreaseButton({item}: {item: CartItem}) {
    const [isPending, startTransition] = useTransition();

    const handleRemoveFromCart= async()=>
  {
    startTransition(async()=>{
      const res = await removeItemFromCart(item.id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    })
  }
  return (
    <Button type="button" disabled = {isPending} variant="outline" onClick={handleRemoveFromCart}>
        {isPending? <Loader className="animate-spin w-4 h-4"/>: <Minus className="w-4 h-4"/>}
    </Button>
  )
}

export default ProductDecreaseButton
