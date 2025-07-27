'use client'
import React from 'react'
import Image from 'next/image'
import { APP_NAME } from '@/lib/constants'
import { Button } from '@/components/ui/button'
function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image src='/images/logo.svg' alt= {`${APP_NAME} logo`} width={48} height={48} priority = {true}/>
      <div className="rounded-lg shadow-md p-6 w-1/3 text-center min-w-[300]">
      <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
      <p className='text-destructive'>Could not find the page that you are looking for</p>
      <Button variant='outline' className='mt-4 ml-2' onClick={()=> window.location.href = '/'}>Get back to home</Button>
      </div>
    </div>
  )
}

export default NotFound
