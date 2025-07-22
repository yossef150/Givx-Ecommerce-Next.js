import React from 'react'
import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import Menu from './Menu'
function Index() {
  return (
    <header className='border-b'>
      <div className="wrapper flex-between">
        <div className="flex-start space-x-2">
            <Link href= '/' className="flex-start space-x-2">
              <span className="text-3xl font-extrabold tracking-wide text-black dark:text-white transition-transform duration-300 hover:scale-105">
                {APP_NAME}
              </span>
                {/* <Image src= '/images/logo.svg' alt={`${APP_NAME} logo`} width={48} height={48}></Image> */}
            {/* <span className='hidden lg:block font-bold text-3xl'>{APP_NAME}</span> */}
            </Link>
        </div>
        <Menu/>
      </div>
    </header>
  )
}

export default Index
