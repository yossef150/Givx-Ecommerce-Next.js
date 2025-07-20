import React from 'react'
import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './Menu'
function Index() {
  return (
    <header className='border-b'>
      <div className="wrapper flex-between">
        <div className="flex-start space-x-2">
            <Link href= '/'>
                <Image src= '/images/logo.svg' alt={`${APP_NAME} logo`} width={48} height={48}></Image>
            </Link>
            <span className='hidden lg:block font-bold text-2xl'>{APP_NAME}</span>
        </div>
        <Menu/>
      </div>
    </header>
  )
}

export default Index
