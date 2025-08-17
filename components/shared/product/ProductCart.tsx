import React from "react";
import type { Cart, CartItem } from "@/types";
import ProductDecreaseButton from "./product-buttons/ProductDecreaseButton";
import ProductIncreaseButton from "./product-buttons/ProductIncreaseButton";
import ProductAddToCartButton from "./product-buttons/ProductAddToCartButton";
function ProductCart({item, cart}: {item: CartItem, cart?: Cart}) {
  // console.log(item)
  
  const existItem = cart && cart.items.find((x)=> x.id === item.id);
  
  return existItem? (
    <div className="mx-auto pt-1">
      <ProductDecreaseButton item = {item}/>
      <span className="px-3 font-medium">{existItem.qty}</span>
      <ProductIncreaseButton item = {item}/>
    </div>
  ): (<ProductAddToCartButton item = {item}/>);
}

export default ProductCart;
