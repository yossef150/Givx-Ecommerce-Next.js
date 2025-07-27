import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import SignInForm from './SignUpForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata : Metadata = {
    title: 'Sign Up',
}
async function page(Props: {searchParams : Promise<{callbackUrl : string}>}) {
    const {callbackUrl} = await Props.searchParams;
    const  session = await auth();
    if(session)
    {
        // console.log(callbackUrl)
        redirect(callbackUrl || '/');
    }
  return (
    <div className='flex-center min-h-screen max-w-md mx-auto'>

    <Card className='w-full'>
      <CardHeader className='w-full flex flex-col gap-2 items-center'>
        <Link href='/'> 
        <Image src = '/images/logo.svg' 
            alt={`${APP_NAME} logo`}
            width={60}
            height={60}
            priority = {true}
            /></Link>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create Account</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm/>
      </CardContent>
    </Card>
    </div>
  )
}

export default page
