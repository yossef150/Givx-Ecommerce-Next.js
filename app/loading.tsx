import React from 'react'
import Image from 'next/image'
function loading() {
  return (
    <div className='flex-center min-h-screen'>
      <Image src= '/loader.gif' width={150} height={150} alt='loading...'/>
    </div>
  )
}

export default loading
