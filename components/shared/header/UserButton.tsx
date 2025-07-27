import React from 'react'
import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOutUser } from '@/lib/actions/user.actions';
async function UserButton() {
    const session = await auth();
    const initialName = session?.user?.name?.charAt(0).toUpperCase();
    if(!session)
    {
        return (<Button asChild>
             <Link href='/sign-in'> <UserIcon/> Sign In </Link>
            </Button>)
    }
  return (
    <div className='flex-center'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='flex-center'>
            <Button variant='ghost' className='w-8 h-8 rounded-full bg-gray-200 flex-center'>{initialName}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                <div className='space-y-1'>
                {session.user?.name}
                <div className='text-muted-foreground'>{session?.user?.email}</div>
                </div>
               
            </DropdownMenuLabel>
            <DropdownMenuItem asChild className='p-0 mb-1'>
                 <form action={logOutUser} className='w-full'>
                    <Button variant='ghost' className='w-full font-normal justify-start py-4 px-2'>Log Out</Button>
                </form>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserButton
