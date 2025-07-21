import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string
{
  const [intValue, decValue] = price.toString().split('.');
  return decValue !== undefined? `${intValue}.${decValue.padEnd(2,'0')}`:
  `${intValue}.00`;
}