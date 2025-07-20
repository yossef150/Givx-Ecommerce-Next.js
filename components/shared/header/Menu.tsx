import React from 'react'
import ToggleTheme from './ToggleTheme'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ShoppingCart, UserIcon, MenuIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Menu() {
  return (
    <>
    <div className='space-x-2 hidden md:flex'>
        <ToggleTheme/>
        <Button asChild variant= 'ghost'>
            <Link href='/cart'> <ShoppingCart/> Cart </Link>
        </Button>
        <Button asChild>
            <Link href='/sign-in'> <UserIcon/> Sign In </Link>
        </Button>
    </div>
    <div className='md:hidden'>
        <Sheet>
        <SheetTrigger><MenuIcon/></SheetTrigger>
        <SheetContent className='flex flex-col items-start px-4 py-6'>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription></SheetDescription>
            {/* <div className='px-3 flex flex-col gap-2'> */}
            <ToggleTheme/>
            <Button asChild variant= 'ghost'>
             <Link href='/cart'> <ShoppingCart/> Cart </Link>
            </Button>
            <Button asChild>
             <Link href='/sign-in'> <UserIcon/> Sign In </Link>
            </Button>
            {/* </div> */}
        </SheetContent>
        </Sheet>
    </div>
    </>
  )
}

export default Menu
